import { useState } from "react";
import { Plus, X } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  labelKey?: string;
  onClick: () => void;
  color: string;
  gradient?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  primaryColor?: string;
}

export function QuickActions({ actions, primaryColor = "#705add" }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (action: QuickAction) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Quick Actions Container */}
      <div className="fixed z-50">
        {/* Mobile: Bottom Right */}
        <div className="md:hidden fixed bottom-20 right-4">
          {/* Action Items - Mobile (Vertical Stack) */}
          <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            {actions.map((action, index) => {
              const Icon = action.icon;
              const delay = index * 50;
              
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                  style={{
                    transitionDelay: isOpen ? `${delay}ms` : '0ms',
                  }}
                >
                  {/* Label */}
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {action.labelKey ? t(action.labelKey) : action.label}
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => handleActionClick(action)}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                    style={{
                      background: action.gradient || `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                    }}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Main FAB Button - Mobile */}
          <button
            onClick={toggleMenu}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
            }}
          >
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Plus className="h-6 w-6 text-white" />
              )}
            </div>
          </button>
        </div>

        {/* Tablet/Desktop: Bottom Right with Horizontal Layout */}
        <div className="hidden md:block fixed bottom-8 right-8">
          {/* Action Items - Tablet (Horizontal + Vertical Grid) */}
          <div className={`mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {actions.slice(0, 4).map((action, index) => {
                const Icon = action.icon;
                const delay = index * 50;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl p-4 transition-all duration-200 hover:-translate-y-1 active:scale-95 min-w-[140px]"
                    style={{
                      transitionDelay: isOpen ? `${delay}ms` : '0ms',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: action.gradient || `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                        }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {action.labelKey ? t(action.labelKey) : action.label}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Extra Actions (if more than 4) */}
            {actions.length > 4 && (
              <div className="flex gap-3 justify-center">
                {actions.slice(4).map((action, index) => {
                  const Icon = action.icon;
                  const delay = (index + 4) * 50;
                  
                  return (
                    <button
                      key={index + 4}
                      onClick={() => handleActionClick(action)}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-xl p-3 transition-all duration-200 hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                      style={{
                        transitionDelay: isOpen ? `${delay}ms` : '0ms',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: action.gradient || `linear-gradient(135deg, ${action.color}, ${action.color}dd)`,
                        }}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-xs font-semibold text-gray-900 pr-2">
                        {action.labelKey ? t(action.labelKey) : action.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main FAB Button - Tablet */}
          <button
            onClick={toggleMenu}
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl active:scale-95 transition-all duration-300 ml-auto"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
            }}
          >
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
              {isOpen ? (
                <X className="h-7 w-7 text-white" />
              ) : (
                <Plus className="h-7 w-7 text-white" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
