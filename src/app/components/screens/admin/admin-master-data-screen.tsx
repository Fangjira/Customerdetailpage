import { Database, Plus, Tag, Sparkles, Briefcase, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface MasterDataCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: any;
  count: number;
  color: string;
}

export function AdminMasterDataScreen() {
  const { t } = useTranslation();

  const categories: MasterDataCategory[] = [
    { id: 'customer-types', name: 'ประเภทลูกค้า', nameEn: 'Customer Types', icon: Building2, count: 8, color: 'blue' },
    { id: 'lead-sources', name: 'แหล่งที่มา Lead', nameEn: 'Lead Sources', icon: Sparkles, count: 12, color: 'green' },
    { id: 'industries', name: 'ประเภทธุรกิจ', nameEn: 'Industries', icon: Briefcase, count: 15, color: 'purple' },
    { id: 'tags', name: 'แท็กและป้ายกำกับ', nameEn: 'Tags & Labels', icon: Tag, count: 24, color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:bg-purple-100' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', hover: 'hover:bg-orange-100' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('admin_master_data')}</h1>
            <p className="mt-1 text-sm text-gray-500">จัดการข้อมูลหลักของระบบ เช่น ประเภทลูกค้า แหล่งที่มา Lead ประเภทธุรกิจ และแท็ก</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const colors = getColorClasses(category.color);
            const Icon = category.icon;
            
            return (
              <div key={category.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${colors.bg} ${colors.text}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    จัดการ
                  </button>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{category.nameEn}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{category.count}</p>
                  <p className="text-xs text-gray-500">รายการทั้งหมด</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customer Types Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">ประเภทลูกค้า</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              <Plus className="h-4 w-4" />
              เพิ่มประเภท
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {['Enterprise', 'SME', 'Startup', 'Individual'].map((type, index) => (
              <div key={type} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{type}</h3>
                    <p className="text-sm text-gray-500">ใช้งาน {Math.floor(Math.random() * 50) + 10} รายการ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    แก้ไข
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">แหล่งที่มา Lead</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              <Plus className="h-4 w-4" />
              เพิ่มแหล่งที่มา
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {['Website', 'Facebook', 'Google Ads', 'Referral', 'Cold Call', 'Email Campaign'].map((source, index) => (
              <div key={source} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{source}</h3>
                    <p className="text-sm text-gray-500">Lead: {Math.floor(Math.random() * 100) + 20} รายการ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    แก้ไข
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
