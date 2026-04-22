import { useRoleTheme } from "../hooks/use-role-theme";
import CustomerDetailPage from "../../imports/CustomerDetailPage-539-2045";
import { useEffect } from "react";
import "../styles/figma-customer-detail-theme.css";

export function CustomerIntelligenceWrapper() {
  const roleTheme = useRoleTheme();

  useEffect(() => {
    // Inject roleTheme colors into CSS variables for the Figma import
    const style = document.documentElement.style;
    style.setProperty('--figma-primary', roleTheme.primary);
    style.setProperty('--figma-gradient-from', roleTheme.gradientFrom);
    style.setProperty('--figma-gradient-to', roleTheme.gradientTo);
    style.setProperty('--figma-lighter', roleTheme.lighter);
    style.setProperty('--figma-lightest', roleTheme.lightest);
    style.setProperty('--figma-border', `${roleTheme.primary}26`); // 15% opacity
  }, [roleTheme]);

  return (
    <div 
      className="figma-customer-detail w-full h-full overflow-auto"
      style={{
        '--stroke-0': roleTheme.primary,
      } as React.CSSProperties}
    >
      <CustomerDetailPage />
    </div>
  );
}