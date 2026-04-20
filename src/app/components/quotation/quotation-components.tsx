import { ReactNode } from "react";

interface SectionHeaderProps {
  number: string;
  title: string;
  titleEn?: string;
  language: "th" | "en";
  className?: string;
}

export function SectionHeader({ number, title, titleEn, language, className = "" }: SectionHeaderProps) {
  const displayTitle = language === "th" ? title : (titleEn || title);
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#7BC9A6] text-white font-bold text-sm">
          {number}
        </div>
        <h3 className="text-lg font-bold text-gray-900">{displayTitle}</h3>
      </div>
      <div className="mt-2 h-0.5 bg-gradient-to-r from-[#7BC9A6] to-transparent" />
    </div>
  );
}

interface EditableTextBlockProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function EditableTextBlock({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  className = "" 
}: EditableTextBlockProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent resize-none ${className}`}
      style={{
        lineHeight: "1.8",
      }}
    />
  );
}

interface PreviewTextBlockProps {
  content: string;
  className?: string;
}

export function PreviewTextBlock({ content, className = "" }: PreviewTextBlockProps) {
  return (
    <div className={`text-gray-700 whitespace-pre-wrap leading-relaxed ${className}`}>
      {content || <span className="text-gray-400 italic">No content</span>}
    </div>
  );
}

interface ToggleSectionProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  title: string;
  children: ReactNode;
}

export function ToggleSection({ enabled, onToggle, title, children }: ToggleSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <label className="font-medium text-gray-900">{title}</label>
        <button
          type="button"
          onClick={() => onToggle(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? "bg-[#7BC9A6]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      {enabled && <div>{children}</div>}
    </div>
  );
}

interface SignatureBlockProps {
  name: string;
  position: string;
  date?: string;
  language: "th" | "en";
}

export function SignatureBlock({ name, position, date, language }: SignatureBlockProps) {
  const labels = {
    th: {
      signature: "ลงนาม",
      name: "ชื่อ",
      position: "ตำแหน่ง",
      date: "วันที่",
    },
    en: {
      signature: "Signature",
      name: "Name",
      position: "Position",
      date: "Date",
    },
  };

  const label = labels[language];

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex justify-end">
        <div className="w-80">
          {/* Signature Line */}
          <div className="mb-6">
            <div className="border-b-2 border-gray-300 h-16 mb-2" />
            <p className="text-sm text-gray-600 text-center">{label.signature}</p>
          </div>

          {/* Name */}
          <div className="mb-3">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{label.name}:</span> {name}
            </p>
          </div>

          {/* Position */}
          <div className="mb-3">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{label.position}:</span> {position}
            </p>
          </div>

          {/* Date */}
          {date && (
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">{label.date}:</span> {date}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ApprovalBlockProps {
  name: string;
  position: string;
  date?: string;
  language: "th" | "en";
}

export function ApprovalBlock({ name, position, date, language }: ApprovalBlockProps) {
  const labels = {
    th: {
      approval: "อนุมัติโดย",
      name: "ชื่อ",
      position: "ตำแหน่ง",
      date: "วันที่",
    },
    en: {
      approval: "Approved by",
      name: "Name",
      position: "Position",
      date: "Date",
    },
  };

  const label = labels[language];

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 bg-[#7BC9A6]/5 -mx-16 px-16 py-8">
      <h4 className="font-bold text-gray-900 mb-6">{label.approval}</h4>
      <div className="flex justify-end">
        <div className="w-80">
          {/* Signature Line */}
          <div className="mb-6">
            <div className="border-b-2 border-[#7BC9A6] h-16 mb-2" />
            <p className="text-sm text-gray-600 text-center">{label.approval}</p>
          </div>

          {/* Name */}
          <div className="mb-3">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{label.name}:</span> {name}
            </p>
          </div>

          {/* Position */}
          <div className="mb-3">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{label.position}:</span> {position}
            </p>
          </div>

          {/* Date */}
          {date && (
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">{label.date}:</span> {date}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
