import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";
import { LanguageSwitcher } from "../language-switcher";
import { useRoleTheme } from "../../hooks/use-role-theme";
import { HCPDashboardScreen } from "./hcp-dashboard-screen";
import { OverviewDashboardScreen } from "./overview-dashboard-screen";
import { ExecutiveDashboardScreen } from "./executive-dashboard-screen";

interface DashboardScreenProps {
  onNavigate?: (path: string, id?: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const roleTheme = useRoleTheme();
  const [timeRange, setTimeRange] = useState("30");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Business overview and key metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hcp" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              HCP
            </TabsTrigger>
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Executive
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <OverviewDashboardScreen />
          </TabsContent>

          {/* HCP Tab */}
          <TabsContent value="hcp">
            <HCPDashboardScreen />
          </TabsContent>

          {/* Executive Tab */}
          <TabsContent value="executive">
            <ExecutiveDashboardScreen />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}