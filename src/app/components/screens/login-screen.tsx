import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Mail, Lock, Sparkles, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../language-switcher";
import { ThemeSwitcher } from "../theme-switcher";

interface LoginScreenProps {
  onLogin: (userMode: 'sales' | 'customer', userRole: string, userEmail: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = t("validation.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("validation.invalid_email");
    }

    if (!password) {
      newErrors.password = t("validation.required");
    } else if (password.length < 6) {
      newErrors.password = t("validation.min_length", { count: 6 });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call and determine user mode based on email
    setTimeout(() => {
      setIsLoading(false);
      
      // Determine mode and role based on email
      // Customer emails typically end with @customer.com or specific customer domains
      // Staff emails end with @onelink.com, etc.
      let userMode: 'sales' | 'customer' = 'sales';
      let userRole = 'admin';
      
      if (email.includes('customer') || email.includes('client')) {
        userMode = 'customer';
        userRole = 'customer';
      } else if (email.includes('@onelink.com') || email.includes('@nexus.com')) {
        userMode = 'sales';
        // Determine role based on email prefix or other logic
        if (email.startsWith('admin') || email === 'demo@nexus.com') {
          userRole = 'admin';
        } else if (email.startsWith('manager')) {
          userRole = 'sales_manager';
        } else {
          userRole = 'sales';
        }
      }
      
      onLogin(userMode, userRole, email);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-200">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-center items-center p-12 bg-gradient-to-br from-[#a78bfa] to-[#705add] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">มีสเปซ</h1>
          <p className="text-xl text-white/90 mb-8">Self Storage Management System</p>
          <div className="max-w-md mx-auto">
            <p className="text-white/80 text-lg leading-relaxed">
              {t("login.welcome_message")}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        {/* Language Switcher */}
        <div className="absolute top-8 right-8">
          <LanguageSwitcher />
        </div>

        {/* Theme Switcher */}
        <div className="absolute top-8 left-8">
          <ThemeSwitcher />
        </div>

        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#705add] flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          <Card className="border-2 rounded-3xl shadow-xl bg-card border-border transition-colors duration-200">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {t("login.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("login.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t("login.email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                    <Input
                      type="email"
                      placeholder={t("login.email_placeholder")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: undefined });
                      }}
                      className={`pl-10 h-12 border-2 rounded-xl bg-secondary focus:border-primary text-foreground ${
                        errors.email ? "border-red-300" : "border-border"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t("login.password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("login.password_placeholder")}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: undefined });
                      }}
                      className={`pl-10 pr-10 h-12 border-2 rounded-xl bg-secondary focus:border-primary text-foreground ${
                        errors.password ? "border-red-300" : "border-border"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-muted data-[state=checked]:bg-[#705add] data-[state=checked]:border-[#705add]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {t("login.remember_me")}
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t("login.forgot_password")}
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#9333ea] hover:to-[#6d28d9] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-base"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t("login.logging_in")}
                    </span>
                  ) : (
                    t("login.login_button")
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-secondary/50 rounded-xl border border-muted">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  {t("login.demo_credentials")}
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{t("login.staff_login")}:</p>
                    <p className="text-xs text-muted-foreground ml-2">Email: staff@onelink.com</p>
                    <p className="text-xs text-muted-foreground ml-2">Password: demo123</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{t("login.customer_login")}:</p>
                    <p className="text-xs text-muted-foreground ml-2">Email: customer@onelink.com</p>
                    <p className="text-xs text-muted-foreground ml-2">Password: demo123</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {t("login.footer")}
          </div>
        </div>
      </div>
    </div>
  );
}
