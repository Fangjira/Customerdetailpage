import { Shield, Lock, Key, AlertTriangle, CheckCircle2, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function AdminSecurityPolicyScreen() {
  const { t } = useTranslation();
  const [policies, setPolicies] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: false,
    ipWhitelist: false,
  });

  const securitySections = [
    {
      title: 'นโยบายรหัสผ่าน',
      icon: Key,
      color: 'blue',
      items: [
        { label: 'ความยาวขั้นต่ำ', value: `${policies.passwordMinLength} ตัวอักษร`, key: 'passwordMinLength' },
        { label: 'ต้องมีตัวพิมพ์ใหญ่', value: policies.passwordRequireUppercase ? 'เปิดใช้งาน' : 'ปิดใช้งาน', enabled: policies.passwordRequireUppercase },
        { label: 'ต้องมีตัวพิมพ์เล็ก', value: policies.passwordRequireLowercase ? 'เปิดใช้งาน' : 'ปิดใช้งาน', enabled: policies.passwordRequireLowercase },
        { label: 'ต้องมีตัวเลข', value: policies.passwordRequireNumbers ? 'เปิดใช้งาน' : 'ปิดใช้งาน', enabled: policies.passwordRequireNumbers },
        { label: 'ต้องมีอักขระพิเศษ', value: policies.passwordRequireSpecialChars ? 'เปิดใช้งาน' : 'ปิดใช้งาน', enabled: policies.passwordRequireSpecialChars },
        { label: 'รหัสผ่านหมดอายุ', value: `${policies.passwordExpiryDays} วัน`, key: 'passwordExpiryDays' },
      ]
    },
    {
      title: 'การเข้าสู่ระบบและเซสชัน',
      icon: Lock,
      color: 'green',
      items: [
        { label: 'จำนวนครั้งที่พยายาม Login สูงสุด', value: `${policies.maxLoginAttempts} ครั้ง`, key: 'maxLoginAttempts' },
        { label: 'Session Timeout', value: `${policies.sessionTimeout} นาที`, key: 'sessionTimeout' },
        { label: 'Two-Factor Authentication (2FA)', value: policies.twoFactorAuth ? 'เปิดใช้งาน' : 'ปิดใช้งาน', enabled: policies.twoFactorAuth },
      ]
    },
    {
      title: 'การควบคุมการเข้าถึง',
      icon: Shield,
      color: 'red',
      items: [
        { label: 'IP Whitelist', value: policies.ipWhitelist ? 'เปิดใช้งาน' : 'ปิดใช้งาน', enabled: policies.ipWhitelist },
        { label: 'จำกัดการเข้าถึงตาม IP', value: policies.ipWhitelist ? '3 IP Addresses' : 'ไม่จำกัด' },
      ]
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600' },
      red: { bg: 'bg-red-50', text: 'text-red-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('admin_security_policy')}</h1>
            <p className="mt-1 text-sm text-gray-500">กำหนดนโยบายความปลอดภัย การเข้าถึงระบบ และการป้องกันข้อมูล</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Settings className="h-4 w-4" />
            บันทึกการตั้งค่า
          </button>
        </div>

        {/* Security Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">สถานะความปลอดภัย</p>
                <p className="mt-1 text-2xl font-bold text-green-600">ดี</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">นโยบายที่เปิดใช้งาน</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">การแจ้งเตือน</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Policies */}
        {securitySections.map((section, sectionIndex) => {
          const colors = getColorClasses(section.color);
          const SectionIcon = section.icon;
          
          return (
            <div key={sectionIndex} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                  <SectionIcon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{item.label}</h3>
                        <p className="mt-1 text-sm text-gray-600">{item.value}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.enabled !== undefined && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.enabled 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {item.enabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                          </span>
                        )}
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          แก้ไข
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Security Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-blue-900">คำแนะนำด้านความปลอดภัย</h3>
              <ul className="mt-3 space-y-2 text-sm text-blue-800">
                <li>• แนะนำให้เปิดใช้งาน Two-Factor Authentication (2FA) เพื่อความปลอดภัยเพิ่มเติม</li>
                <li>• ตั้งค่ารหัสผ่านให้หมดอายุทุก 90 วัน เพื่อลดความเสี่ยง</li>
                <li>• ใช้ IP Whitelist สำหรับผู้ใช้งานที่มีสิทธิ์เข้าถึงข้อมูลสำคัญ</li>
                <li>• ตรวจสอบ Audit Log เป็นประจำเพื่อติดตามการใช้งานที่ผิดปกติ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
