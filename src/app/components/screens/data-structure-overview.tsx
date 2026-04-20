import React from 'react';
import { Database, Table } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DataStructureOverview() {
  const { t } = useTranslation();

  const tables = [
    {
      name: 'site_visits',
      description: t('siteVisit.data.siteVisitsDesc', 'Main table for site visit records'),
      color: 'blue',
    },
    {
      name: 'site_requirements',
      description: t('siteVisit.data.requirementsDesc', 'Special requirements from site visit (RQ40)'),
      color: 'orange',
    },
    {
      name: 'site_layouts',
      description: t('siteVisit.data.layoutsDesc', 'Site layout and area mapping records (RQ43)'),
      color: 'green',
    },
    {
      name: 'requirement_alerts',
      description: t('siteVisit.data.alertsDesc', 'Critical requirement alerts shown in Deal/Contract'),
      color: 'red',
    },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700' },
      green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700' },
      red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border-2 border-border p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-lg flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t('siteVisit.data.title', 'Data Structure Overview')}
            </h2>
            <p className="text-muted-foreground">
              {t('siteVisit.data.description', 'Database structure for Site Visit and Special Requirements Management')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tables.map((table) => {
            const colors = getColorClass(table.color);
            return (
              <div
                key={table.name}
                className={`border-2 ${colors.border} rounded-xl overflow-hidden`}
              >
                <div className={`${colors.bg} p-4`}>
                  <div className="flex items-center gap-3">
                    <Table className={`w-5 h-5 ${colors.text}`} />
                    <div>
                      <h3 className={`font-bold ${colors.text}`}>{table.name}</h3>
                      <p className={`text-sm ${colors.text} opacity-80 mt-1`}>{table.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relationships */}
      <div className="bg-card rounded-xl border-2 border-border p-6 shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-4">
          {t('siteVisit.data.relationships', 'Table Relationships')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-mono text-sm">
              site_visits
            </span>
            <span className="text-sm text-muted-foreground">1:N</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded font-mono text-sm">
              site_requirements
            </span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-mono text-sm">
              site_visits
            </span>
            <span className="text-sm text-muted-foreground">1:N</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-mono text-sm">
              site_layouts
            </span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded font-mono text-sm">
              site_requirements
            </span>
            <span className="text-sm text-muted-foreground">1:N</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded font-mono text-sm">
              requirement_alerts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
