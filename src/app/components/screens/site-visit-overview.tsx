import React, { useState } from 'react';
import { 
  MapPin, Calendar, User, Building, AlertTriangle, CheckCircle, 
  Clock, Thermometer, Droplets, Truck, Package, Plus, Search
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SiteVisit {
  id: string;
  visitDate: string;
  customer: string;
  branch: string;
  service: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  requirements: {
    temperature: boolean;
    humidity: boolean;
    liftZone: boolean;
    loadingDock: boolean;
  };
  criticalFlags: number;
  assignedTo: string;
}

export function SiteVisitOverview() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const siteVisits: SiteVisit[] = [
    {
      id: 'SV-2026-001',
      visitDate: '2026-01-10',
      customer: 'บริษัท โกลบอล โลจิสติกส์ จำกัด',
      branch: 'สาขาลาดพร้าว',
      service: 'ห้องเก็บของธุรกิจ',
      status: 'scheduled',
      requirements: {
        temperature: true,
        humidity: true,
        liftZone: false,
        loadingDock: true,
      },
      criticalFlags: 2,
      assignedTo: 'สมชาย ใจดี',
    },
    {
      id: 'SV-2026-002',
      visitDate: '2026-01-08',
      customer: 'Wine Collector Club',
      branch: 'สาขาสีลม',
      service: 'ห้องเก็บไวน์',
      status: 'completed',
      requirements: {
        temperature: true,
        humidity: true,
        liftZone: false,
        loadingDock: false,
      },
      criticalFlags: 3,
      assignedTo: 'วิไล สุขสันต์',
    },
    {
      id: 'SV-2026-003',
      visitDate: '2026-01-15',
      customer: 'Tech Startup Co.',
      branch: 'สาขาสุขุมวิท',
      service: 'ไดร์ฟอิน',
      status: 'scheduled',
      requirements: {
        temperature: false,
        humidity: false,
        liftZone: true,
        loadingDock: true,
      },
      criticalFlags: 1,
      assignedTo: 'นภา รักษ์ดี',
    },
  ];

  const stats = [
    {
      label: t('siteVisit.stats.scheduled', 'Scheduled'),
      value: siteVisits.filter(v => v.status === 'scheduled').length,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: t('siteVisit.stats.completed', 'Completed'),
      value: siteVisits.filter(v => v.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: t('siteVisit.stats.withRequirements', 'With Requirements'),
      value: siteVisits.filter(v => v.criticalFlags > 0).length,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: t('siteVisit.stats.criticalFlags', 'Critical Flags'),
      value: siteVisits.reduce((sum, v) => sum + v.criticalFlags, 0),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-gray-100 text-gray-700',
    };
    const labels = {
      scheduled: t('siteVisit.status.scheduled', 'Scheduled'),
      completed: t('siteVisit.status.completed', 'Completed'),
      cancelled: t('siteVisit.status.cancelled', 'Cancelled'),
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getRequirementBadges = (requirements: SiteVisit['requirements']) => {
    const badges = [];
    if (requirements.temperature) {
      badges.push(
        <span key="temp" className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
          <Thermometer className="w-3 h-3" />
          {t('siteVisit.requirements.temperature', 'Temp')}
        </span>
      );
    }
    if (requirements.humidity) {
      badges.push(
        <span key="humid" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
          <Droplets className="w-3 h-3" />
          {t('siteVisit.requirements.humidity', 'Humidity')}
        </span>
      );
    }
    if (requirements.liftZone) {
      badges.push(
        <span key="lift" className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
          <Package className="w-3 h-3" />
          {t('siteVisit.requirements.liftZone', 'Lift Zone')}
        </span>
      );
    }
    if (requirements.loadingDock) {
      badges.push(
        <span key="dock" className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
          <Truck className="w-3 h-3" />
          {t('siteVisit.requirements.loadingDock', 'Loading Dock')}
        </span>
      );
    }
    return badges;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card rounded-xl border-2 border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Actions */}
      <div className="bg-card rounded-xl border-2 border-border p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('siteVisit.search', 'Search site visit, customer, branch...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#705add] focus:border-transparent text-foreground"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-background border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#705add] focus:border-transparent text-foreground"
            >
              <option value="all">{t('common.allStatus', 'All Status')}</option>
              <option value="scheduled">{t('siteVisit.status.scheduled', 'Scheduled')}</option>
              <option value="completed">{t('siteVisit.status.completed', 'Completed')}</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white rounded-lg hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              <span>{t('siteVisit.newVisit', 'New Site Visit')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Site Visit List */}
      <div className="bg-card rounded-xl border-2 border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b-2 border-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('siteVisit.table.idDate', 'ID / Date')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('siteVisit.table.customer', 'Customer')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('siteVisit.table.branchService', 'Branch / Service')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('siteVisit.table.requirements', 'Special Requirements')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('siteVisit.table.status', 'Status')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('siteVisit.table.assignedTo', 'Assigned To')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {siteVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-foreground">{visit.id}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(visit.visitDate).toLocaleDateString(i18n.language === 'th' ? 'th-TH' : 'en-US')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{visit.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {visit.branch}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{visit.service}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {getRequirementBadges(visit.requirements)}
                      {visit.criticalFlags > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          {visit.criticalFlags} {t('siteVisit.critical', 'Critical')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(visit.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {visit.assignedTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
