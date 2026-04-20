import React from 'react';
import { Upload, Image } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LayoutManager() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border-2 border-border p-12 text-center shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Image className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            {t('siteVisit.layoutManager', 'Site Layout & Area Management')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t('siteVisit.rq43Description', 'RQ43 - Upload and manage site layouts, warehouse floor plans, and loading area diagrams')}
          </p>
          <div className="flex gap-3 justify-center">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white rounded-lg hover:shadow-lg transition-all font-medium">
              <Upload className="w-5 h-5" />
              <span>{t('siteVisit.uploadLayout', 'Upload Layout')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
