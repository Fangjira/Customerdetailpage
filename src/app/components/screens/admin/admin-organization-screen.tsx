import { Building2, Users, Briefcase, MapPin, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface OrgUnit {
  id: string;
  name: string;
  type: 'business-unit' | 'department' | 'team' | 'branch';
  parent?: string;
  head: string;
  members: number;
  location?: string;
}

export function AdminOrganizationScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'business-units' | 'departments' | 'teams' | 'branches'>('business-units');

  const orgData: OrgUnit[] = [
    { id: '1', name: 'Sales Division', type: 'business-unit', head: 'John Smith', members: 45 },
    { id: '2', name: 'Operations Division', type: 'business-unit', head: 'Sarah Johnson', members: 32 },
    { id: '3', name: 'Sales Team A', type: 'team', parent: '1', head: 'Mike Chen', members: 8 },
    { id: '4', name: 'Bangkok Branch', type: 'branch', head: 'Tom Cook', members: 25, location: 'Bangkok, Thailand' },
  ];

  const filteredData = orgData.filter(unit => unit.type === activeTab.replace('-', '') as any);

  const getIcon = (type: string) => {
    switch(type) {
      case 'business-unit': return <Building2 className="h-5 w-5" />;
      case 'department': return <Briefcase className="h-5 w-5" />;
      case 'team': return <Users className="h-5 w-5" />;
      case 'branch': return <MapPin className="h-5 w-5" />;
      default: return <Building2 className="h-5 w-5" />;
    }
  };

  const tabs = [
    { id: 'business-units', label: t('admin_business_units') || 'Business Units', icon: Building2 },
    { id: 'departments', label: t('admin_departments') || 'Departments', icon: Briefcase },
    { id: 'teams', label: t('admin_teams') || 'Teams', icon: Users },
    { id: 'branches', label: t('admin_branches') || 'Branches', icon: MapPin },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('admin_organization')}</h1>
            <p className="mt-1 text-sm text-gray-500">จัดการโครงสร้างองค์กร หน่วยงาน แผนก ทีม และสาขา</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="h-4 w-4" />
            เพิ่มหน่วยงาน
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((unit) => (
                <div key={unit.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-50 rounded-lg text-red-600">
                        {getIcon(unit.type)}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{unit.name}</h3>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-600">หัวหน้า: {unit.head}</p>
                          <p className="text-sm text-gray-600">สมาชิก: {unit.members} คน</p>
                          {unit.location && (
                            <p className="text-sm text-gray-600">สถานที่: {unit.location}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      แก้ไข
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  {getIcon(activeTab.replace('-', ''))}
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">ยังไม่มีข้อมูล</h3>
                <p className="text-sm text-gray-500">คลิกปุ่ม "เพิ่มหน่วยงาน" เพื่อเริ่มต้น</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
