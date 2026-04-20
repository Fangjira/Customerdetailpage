import React, { useState } from 'react';
import { 
  AlertTriangle, Thermometer, Droplets, Package, Truck, 
  MapPin, Calendar, User, Building, FileText, Image, 
  Save, X, Edit2, Tag, CheckCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LayoutPreviewModal } from './layout-preview-modal';

interface Requirement {
  id: string;
  type: 'temperature' | 'humidity' | 'liftZone' | 'loadingDock';
  value: string;
  critical: boolean;
  linkedTo: {
    customer: boolean;
    site: boolean;
    service: boolean;
  };
  notes: string;
}

export function SiteVisitDetail() {
  const { t, i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [showLayoutModal, setShowLayoutModal] = useState(false);

  const siteVisit = {
    id: 'SV-2026-001',
    visitDate: '2026-01-10',
    customer: 'บริษัท โกลบอล โลจิสติกส์ จำกัด',
    branch: 'สาขาลาดพร้าว',
    service: 'ห้องเก็บของธุรกิจ',
    status: 'scheduled',
    assignedTo: 'สมชาย ใจดี',
    visitTime: '14:00',
    contactPerson: 'คุณสมศักดิ์ วงศ์ใหญ่',
    contactPhone: '02-123-4567',
    purpose: 'ประเมินพื้นที่สำหรับจัดเก็บสินค้าอิเล็กทรอนิกส์',
  };

  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 'REQ-001',
      type: 'temperature',
      value: '18-22°C',
      critical: true,
      linkedTo: { customer: true, site: true, service: true },
      notes: 'ควบคุมอุณหภูมิตลอด 24 ชม. สำหรับสินค้าอิเล็กทรอนิกส์',
    },
    {
      id: 'REQ-002',
      type: 'humidity',
      value: '40-60%',
      critical: true,
      linkedTo: { customer: true, site: true, service: false },
      notes: 'ป้องกันความชื้นสูงที่อาจทำให้อุปกรณ์ชำรุด',
    },
    {
      id: 'REQ-003',
      type: 'loadingDock',
      value: 'รองรับรถบรรทุก 6 ล้อ',
      critical: false,
      linkedTo: { customer: false, site: true, service: true },
      notes: 'ต้องมีพื้นที่ขนถ่ายสินค้าขนาดใหญ่',
    },
  ]);

  const requirementTypes = {
    temperature: {
      icon: Thermometer,
      label: t('siteVisit.requirementTypes.temperature', 'อุณหภูมิ'),
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-300',
    },
    humidity: {
      icon: Droplets,
      label: t('siteVisit.requirementTypes.humidity', 'ความชื้น'),
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-300',
    },
    liftZone: {
      icon: Package,
      label: t('siteVisit.requirementTypes.liftZone', 'โซนลิฟต์'),
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-300',
    },
    loadingDock: {
      icon: Truck,
      label: t('siteVisit.requirementTypes.loadingDock', 'ท่าขนของ'),
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-300',
    },
  };

  return (
    <div className="space-y-6">
      {/* Site Visit Header - Simplified */}
      <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl border-2 border-purple-200 p-8 shadow-sm">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {siteVisit.id}
              </h2>
              <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-md">
                {t('siteVisit.status.scheduled', 'กำหนดการ')}
              </span>
            </div>
            {requirements.filter(r => r.critical).length > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-semibold">
                  {requirements.filter(r => r.critical).length} {t('siteVisit.criticalRequirements', 'ข้อกำหนดสำคัญ')}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-purple-200 text-purple-700 font-medium rounded-xl hover:bg-purple-50 transition-all shadow-sm"
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            <span>{isEditing ? t('common.cancel', 'ยกเลิก') : t('common.edit', 'แก้ไข')}</span>
          </button>
        </div>

        {/* Info Grid - More Spacious */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-purple-100">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{t('siteVisit.visitDate', 'วันที่เข้าเยี่ยม')}</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(siteVisit.visitDate).toLocaleDateString(i18n.language === 'th' ? 'th-TH' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-purple-600 font-medium mt-1">{siteVisit.visitTime} น.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-purple-100">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
              <User className="w-6 h-6 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{t('siteVisit.customer', 'ลูกค้า')}</p>
              <p className="text-lg font-bold text-gray-900">{siteVisit.customer}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-purple-100">
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
              <MapPin className="w-6 h-6 text-green-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{t('siteVisit.branch', 'สาขา')}</p>
              <p className="text-lg font-bold text-gray-900">{siteVisit.branch}</p>
              <p className="text-gray-600 mt-1">{siteVisit.service}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-purple-100">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
              <FileText className="w-6 h-6 text-orange-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">{t('siteVisit.contactPerson', 'ผู้ติดต่อ')}</p>
              <p className="text-lg font-bold text-gray-900">{siteVisit.contactPerson}</p>
              <p className="text-gray-600 mt-1">{siteVisit.contactPhone}</p>
            </div>
          </div>
        </div>

        {/* Purpose Section */}
        <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
          <p className="text-sm font-semibold text-purple-700 mb-2">
            {t('siteVisit.purpose', 'วัตถุประสงค์')}
          </p>
          <p className="text-gray-800 text-base leading-relaxed">{siteVisit.purpose}</p>
        </div>

        {/* View Layout Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowLayoutModal(true)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl hover:shadow-xl transition-all font-medium"
          >
            <Image className="w-5 h-5" />
            <span>{t('siteVisit.viewLayout', 'ดูแผนผังสถานที่')}</span>
          </button>
        </div>
      </div>

      {/* Special Requirements Section - Card Style */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {t('siteVisit.specialRequirements', 'ข้อกำหนดพิเศษ')}
            </h3>
            <p className="text-gray-500">
              {t('siteVisit.rq40Description', 'RQ40 - จัดการข้อจำกัดจากการเข้าเยี่ยมสถานที่')}
            </p>
          </div>
          {isEditing && (
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
              <Save className="w-5 h-5" />
              <span>{t('common.save', 'บันทึก')}</span>
            </button>
          )}
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map((req) => {
            const typeConfig = requirementTypes[req.type];
            const Icon = typeConfig.icon;

            return (
              <div
                key={req.id}
                className={`${typeConfig.bgColor} ${typeConfig.borderColor} border-2 rounded-2xl overflow-hidden hover:shadow-lg transition-all ${
                  req.critical ? 'ring-4 ring-red-200 ring-opacity-50' : ''
                }`}
              >
                {/* Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-white rounded-xl shadow-sm ${typeConfig.iconColor}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">
                          {typeConfig.label}
                        </h4>
                        <p className={`text-2xl font-bold ${typeConfig.iconColor}`}>
                          {req.value}
                        </p>
                      </div>
                    </div>
                    {req.critical && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg shadow-md">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-bold">{t('siteVisit.critical', 'สำคัญ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="mt-4 p-4 bg-white bg-opacity-60 rounded-xl">
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      {t('siteVisit.notes', 'หมายเหตุ')}:
                    </p>
                    {isEditing ? (
                      <textarea
                        className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
                        rows={2}
                        defaultValue={req.notes}
                      />
                    ) : (
                      <p className="text-gray-800 text-sm leading-relaxed">{req.notes}</p>
                    )}
                  </div>

                  {/* Links */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {req.linkedTo.customer && (
                      <span className="px-3 py-1 bg-white shadow-sm rounded-lg text-xs font-medium text-gray-700 border border-gray-200">
                        🔗 ลูกค้า
                      </span>
                    )}
                    {req.linkedTo.site && (
                      <span className="px-3 py-1 bg-white shadow-sm rounded-lg text-xs font-medium text-gray-700 border border-gray-200">
                        🔗 สาขา
                      </span>
                    )}
                    {req.linkedTo.service && (
                      <span className="px-3 py-1 bg-white shadow-sm rounded-lg text-xs font-medium text-gray-700 border border-gray-200">
                        🔗 บริการ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Requirement Button */}
        {isEditing && (
          <button className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-purple-300 rounded-2xl hover:bg-purple-50 transition-colors text-purple-700 font-medium">
            <Tag className="w-5 h-5" />
            <span>{t('siteVisit.addRequirement', 'เพิ่มข้อกำหนด')}</span>
          </button>
        )}
      </div>

      {/* Critical Requirements Alert - Simplified */}
      {requirements.filter(r => r.critical).length > 0 && (
        <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-2xl border-2 border-red-300 p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-md">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-red-900 mb-2">
                {t('siteVisit.warningPreview', '⚠️ แจ้งเตือนในระบบ')}
              </h4>
              <p className="text-red-800 mb-4">
                {t('siteVisit.warningDescription', 'ข้อกำหนดสำคัญเหล่านี้จะแสดงคำเตือนในหน้า Deal และ Contract เพื่อให้ทีมรับทราบ')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requirements.filter(r => r.critical).map((req) => {
                  const typeConfig = requirementTypes[req.type];
                  const Icon = typeConfig.icon;
                  return (
                    <div key={req.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                      <Icon className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-red-900 font-bold block">{typeConfig.label}</span>
                        <span className="text-sm text-red-700 block truncate">{req.value}</span>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Preview Modal */}
      {showLayoutModal && (
        <LayoutPreviewModal
          onClose={() => setShowLayoutModal(false)}
          siteVisitId={siteVisit.id}
          branch={siteVisit.branch}
        />
      )}
    </div>
  );
}
