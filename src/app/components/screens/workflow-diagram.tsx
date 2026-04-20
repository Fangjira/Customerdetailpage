import React from 'react';
import { GitBranch, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WorkflowDiagram() {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t('siteVisit.workflow.schedule', 'Schedule Site Visit'), color: 'blue' },
    { id: 2, label: t('siteVisit.workflow.conduct', 'Conduct Site Visit'), color: 'purple' },
    { id: 3, label: t('siteVisit.workflow.requirements', 'Record Requirements (RQ40)'), color: 'orange' },
    { id: 4, label: t('siteVisit.workflow.upload', 'Upload Layouts (RQ43)'), color: 'green' },
    { id: 5, label: t('siteVisit.workflow.tag', 'Tag & Link'), color: 'indigo' },
    { id: 6, label: t('siteVisit.workflow.flag', 'Flag Critical'), color: 'red' },
    { id: 7, label: t('siteVisit.workflow.warnings', 'Show Warnings'), color: 'yellow' },
    { id: 8, label: t('siteVisit.workflow.complete', 'Completed'), color: 'emerald' },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      orange: 'from-orange-400 to-orange-600',
      green: 'from-green-400 to-green-600',
      indigo: 'from-indigo-400 to-indigo-600',
      red: 'from-red-400 to-red-600',
      yellow: 'from-yellow-400 to-yellow-600',
      emerald: 'from-emerald-400 to-emerald-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border-2 border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-lg flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {t('siteVisit.workflow.title', 'Site Visit Workflow')}
            </h2>
            <p className="text-muted-foreground">
              {t('siteVisit.workflow.description', 'Complete workflow from scheduling to requirements documentation')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              <div className={`bg-gradient-to-br ${getColorClass(step.color)} p-4 rounded-xl text-white shadow-md`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.label}</p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Integration Points */}
      <div className="bg-gradient-to-br from-[#705add]/10 to-[#9b8ae8]/10 rounded-xl border-2 border-[#705add]/30 p-6">
        <h3 className="font-bold text-foreground mb-4">
          {t('siteVisit.workflow.integration', 'CRM Integration Points')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-card rounded-lg border-2 border-border p-3">
            <div className="text-sm font-medium text-foreground mb-1">
              {t('siteVisit.workflow.dealScreen', 'Deal Screen')}
            </div>
            <div className="text-xs text-muted-foreground">
              {t('siteVisit.workflow.dealWarnings', 'Shows critical requirement warnings')}
            </div>
          </div>
          <div className="bg-card rounded-lg border-2 border-border p-3">
            <div className="text-sm font-medium text-foreground mb-1">
              {t('siteVisit.workflow.contractScreen', 'Contract Screen')}
            </div>
            <div className="text-xs text-muted-foreground">
              {t('siteVisit.workflow.contractConditions', 'Includes special conditions')}
            </div>
          </div>
          <div className="bg-card rounded-lg border-2 border-border p-3">
            <div className="text-sm font-medium text-foreground mb-1">
              {t('siteVisit.workflow.customerProfile', 'Customer Profile')}
            </div>
            <div className="text-xs text-muted-foreground">
              {t('siteVisit.workflow.visitHistory', 'Displays visit history')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
