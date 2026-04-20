import { Button } from "./ui/button";
// Temporarily disabled - using role-based theme instead of light/dark mode
// import { useTheme } from "../../contexts/theme-context";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ThemeSwitcher() {
  // Temporarily disabled - app now uses role-based theme colors
  // const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  // Return null to hide the switcher
  // TODO: Remove all ThemeSwitcher usage from the app
  return null;

  // Original implementation (disabled)
  /*
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="gap-2 h-10 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all shadow-sm"
      title={theme === "dark" ? t("theme.light_mode") : t("theme.dark_mode")}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-5 w-5 text-amber-500" />
          <span className="text-[15px] font-semibold">{t("theme.light_mode")}</span>
        </>
      ) : (
        <>
          <Moon className="h-5 w-5 text-indigo-600" />
          <span className="text-[15px] font-semibold">{t("theme.dark_mode")}</span>
        </>
      )}
    </Button>
  );
  */
}