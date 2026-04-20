import { FileText, Plus, Copy, Eye, Edit } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  lastModified: string;
  usageCount: number;
  status: 'active' | 'draft';
}

export function AdminQuotationTemplatesScreen() {
  const { t } = useTranslation();

  const templates: Template[] = [
    {
      id: '1',
      name: 'Standard Quotation - Thai/English',
      description: 'เทมเพลตมาตรฐานสำหรับใบเสนอราคาทั่วไป รองรับภาษาไทยและอังกฤษ',
      category: 'General',
      lastModified: '2024-02-01',
      usageCount: 156,
      status: 'active'
    },
    {
      id: '2',
      name: 'Self Storage Quotation',
      description: 'เทมเพลตสำหรับธุรกิจ Self Storage พร้อมตารางราคาห้องเก็บของ',
      category: 'Self Storage',
      lastModified: '2024-01-28',
      usageCount: 89,
      status: 'active'
    },
    {
      id: '3',
      name: 'Logistics Service Quotation',
      description: 'เทมเพลตสำหรับบริการโลจิสติกส์ ขนส่งสินค้า',
      category: 'Logistics',
      lastModified: '2024-01-25',
      usageCount: 134,
      status: 'active'
    },
    {
      id: '4',
      name: 'Enterprise Package Quotation',
      description: 'เทมเพลตสำหรับลูกค้าองค์กรขนาดใหญ่ พร้อมส่วนลดพิเศษ',
      category: 'Enterprise',
      lastModified: '2024-01-20',
      usageCount: 45,
      status: 'draft'
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="mx-auto max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('admin_quotation_templates')}</h1>
            <p className="mt-1 text-sm text-gray-500">จัดการเทมเพลตใบเสนอราคา สร้าง แก้ไข และปรับแต่งรูปแบบเอกสาร</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="h-4 w-4" />
            สร้างเทมเพลตใหม่
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-red-50 rounded-lg text-red-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">เทมเพลตทั้งหมด</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{templates.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">ใช้งานอยู่</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {templates.filter(t => t.status === 'active').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">แบบร่าง</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {templates.filter(t => t.status === 'draft').length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Copy className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">ใช้งานทั้งหมด</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Templates List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">รายการเทมเพลต</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {templates.map((template) => (
              <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-50 rounded-lg text-red-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-gray-900">{template.name}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {template.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{template.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span>หมวดหมู่: {template.category}</span>
                        <span>•</span>
                        <span>ใช้งาน: {template.usageCount} ครั้ง</span>
                        <span>•</span>
                        <span>แก้ไขล่าสุด: {template.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Copy className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
