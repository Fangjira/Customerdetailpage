import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

export function LanguageSwitcher({ variant = "default", className = "" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng: string) => {
    console.log("Changing language to:", lng);
    await i18n.changeLanguage(lng);
    console.log("Language changed successfully to:", i18n.language);
  };

  if (variant === "compact") {
    // Compact version - for tight spaces
    return (
      <div className={`flex gap-1 ${className}`}>
        <Button
          variant={i18n.language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => changeLanguage("en")}
          className={`h-7 px-2 text-xs ${
            i18n.language === "en"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          EN
        </Button>
        <Button
          variant={i18n.language === "th" ? "default" : "ghost"}
          size="sm"
          onClick={() => changeLanguage("th")}
          className={`h-7 px-2 text-xs ${
            i18n.language === "th"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          TH
        </Button>
      </div>
    );
  }

  if (variant === "inline") {
    // Inline version - no border
    return (
      <div className={`flex gap-1 ${className}`}>
        <Button
          variant={i18n.language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => changeLanguage("en")}
          className={`h-8 px-3 text-xs ${
            i18n.language === "en"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Globe className="mr-1 h-3 w-3" />
          EN
        </Button>
        <Button
          variant={i18n.language === "th" ? "default" : "ghost"}
          size="sm"
          onClick={() => changeLanguage("th")}
          className={`h-8 px-3 text-xs ${
            i18n.language === "th"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Globe className="mr-1 h-3 w-3" />
          TH
        </Button>
      </div>
    );
  }

  // Default version - with border and icons
  return (
    <div className={`flex gap-1 border-2 border-gray-200 rounded-lg p-1 shadow-sm ${className}`}>
      <Button
        variant={i18n.language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("en")}
        className={`h-9 px-3 text-[15px] font-semibold ${
          i18n.language === "en"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <Globe className="mr-1.5 h-4 w-4" />
        EN
      </Button>
      <Button
        variant={i18n.language === "th" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("th")}
        className={`h-9 px-3 text-[15px] font-semibold ${
          i18n.language === "th"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <Globe className="mr-1.5 h-4 w-4" />
        TH
      </Button>
    </div>
  );
}