import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2, FileText, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LayoutPreviewModalProps {
  onClose: () => void;
  siteVisitId: string;
  branch: string;
}

export function LayoutPreviewModal({ onClose, siteVisitId, branch }: LayoutPreviewModalProps) {
  const { t, i18n } = useTranslation();
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const layoutVersions = [
    {
      id: 'V1',
      version: '1.0',
      date: '2026-01-05',
      uploadedBy: 'สมชาย ใจดี',
      type: 'Site Layout Plan',
      current: true,
    },
    {
      id: 'V2',
      version: '0.9',
      date: '2025-12-20',
      uploadedBy: 'วิไล สุขสันต์',
      type: 'Site Layout Plan',
      current: false,
    },
  ];

  return (
    <div className="bg-card rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col border-2 border-border">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {t('siteVisit.layoutPreview', 'Site Layout & Area Mapping')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {siteVisitId} - {branch}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Preview Area */}
          <div className="flex-1 bg-muted/30 p-6 overflow-auto">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 bg-card rounded-lg p-3 border-2 border-border">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="p-2 hover:bg-muted rounded transition-colors"
                  title={t('common.zoomOut', 'Zoom Out')}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-foreground min-w-[60px] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 10))}
                  className="p-2 hover:bg-muted rounded transition-colors"
                  title={t('common.zoomIn', 'Zoom In')}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-border mx-2"></div>
                <button
                  onClick={() => setRotation((rotation + 90) % 360)}
                  className="p-2 hover:bg-muted rounded transition-colors"
                  title={t('common.rotate', 'Rotate')}
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoom(100)}
                  className="p-2 hover:bg-muted rounded transition-colors"
                  title={t('common.fitScreen', 'Fit to Screen')}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white rounded-lg hover:shadow-lg transition-all">
                <Download className="w-4 h-4" />
                <span className="text-sm">{t('common.download', 'Download')}</span>
              </button>
            </div>

            {/* Layout Preview */}
            <div className="bg-card rounded-lg border-2 border-border p-8 min-h-[500px] flex items-center justify-center">
              <div
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Mock Site Layout SVG */}
                <svg width="600" height="400" viewBox="0 0 600 400" className="border border-border">
                  <rect width="600" height="400" fill="currentColor" className="fill-muted" />
                  <rect x="50" y="50" width="500" height="300" fill="white" stroke="currentColor" strokeWidth="2" className="stroke-border" />
                  
                  {/* Storage Rooms */}
                  <rect x="70" y="70" width="100" height="80" fill="#ddd6fe" stroke="#705add" strokeWidth="1.5" />
                  <text x="120" y="115" textAnchor="middle" fontSize="12" fill="#705add">Room A1</text>
                  
                  <rect x="190" y="70" width="100" height="80" fill="#ddd6fe" stroke="#705add" strokeWidth="1.5" />
                  <text x="240" y="115" textAnchor="middle" fontSize="12" fill="#705add">Room A2</text>
                  
                  <rect x="310" y="70" width="100" height="80" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="360" y="110" textAnchor="middle" fontSize="12" fill="#ef4444">Room A3</text>
                  <text x="360" y="125" textAnchor="middle" fontSize="10" fill="#ef4444">(Temp Control)</text>
                  
                  <rect x="430" y="70" width="100" height="80" fill="#ddd6fe" stroke="#705add" strokeWidth="1.5" />
                  <text x="480" y="115" textAnchor="middle" fontSize="12" fill="#705add">Room A4</text>
                  
                  {/* Loading Dock */}
                  <rect x="70" y="270" width="200" height="60" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                  <text x="170" y="305" textAnchor="middle" fontSize="14" fill="#22c55e" fontWeight="bold">Loading Dock</text>
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 bg-card rounded-lg border-2 border-border p-4">
              <h4 className="text-sm font-bold text-foreground mb-3">
                {t('siteVisit.legend', 'Legend')}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#ddd6fe] border border-[#705add]"></div>
                  <span className="text-xs text-muted-foreground">{t('siteVisit.standardRoom', 'Standard Room')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#fee2e2] border border-[#ef4444]"></div>
                  <span className="text-xs text-muted-foreground">{t('siteVisit.tempControl', 'Temp Control')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#fef3c7] border border-[#f59e0b]"></div>
                  <span className="text-xs text-muted-foreground">{t('siteVisit.humidityControl', 'Humidity Control')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#dcfce7] border border-[#22c55e]"></div>
                  <span className="text-xs text-muted-foreground">{t('siteVisit.loadingDock', 'Loading Dock')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Version History Sidebar */}
          <div className="w-80 border-l-2 border-border bg-muted/30 p-4 overflow-auto">
            <h3 className="font-bold text-foreground mb-4">
              {t('siteVisit.versionHistory', 'Version History')}
            </h3>
            <div className="space-y-3">
              {layoutVersions.map((version) => (
                <div
                  key={version.id}
                  className={`bg-card rounded-lg border-2 p-3 cursor-pointer transition-all ${
                    version.current
                      ? 'border-[#705add] shadow-md'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {t('siteVisit.version', 'Version')} {version.version}
                      </span>
                    </div>
                    {version.current && (
                      <span className="px-2 py-0.5 bg-[#705add] text-white text-xs rounded-full">
                        {t('siteVisit.current', 'Current')}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(version.date).toLocaleDateString(i18n.language === 'th' ? 'th-TH' : 'en-US')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{version.type}</span>
                    </div>
                    <p className="text-muted-foreground">
                      {t('siteVisit.by', 'By')} {version.uploadedBy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 px-4 py-2 border-2 border-border rounded-lg hover:bg-card transition-colors text-sm">
              {t('siteVisit.uploadNewVersion', 'Upload New Version')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
