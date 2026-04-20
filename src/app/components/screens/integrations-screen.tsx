import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Database,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Link2,
  Building2,
  Package,
  Users,
  FileText,
  Activity,
  Shield,
  ArrowRight,
  Calendar,
  Clock,
  TrendingUp,
  Globe,
  Server,
  Zap,
  Briefcase,
  Plus,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function IntegrationsScreen() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<"overview" | "dbd" | "master" | "logs" | "architecture">("overview");

  // Mock integration data
  const integrations = [
    {
      id: "dbd",
      name: "DBD Thailand",
      nameEn: "Department of Business Development",
      nameTh: "กรมพัฒนาธุรกิจการค้า",
      status: "active",
      lastSync: "2024-01-05 14:30",
      totalSyncs: 1247,
      successRate: 98.5,
      endpoint: "https://api.dbd.go.th/v1",
      apiVersion: "v1.2.0",
    },
    {
      id: "master",
      name: "Product/Service Master",
      nameEn: "Central Master Data",
      nameTh: "ข้อมูลหลักส่วนกลาง",
      status: "active",
      lastSync: "2024-01-05 15:00",
      totalSyncs: 3421,
      successRate: 99.8,
      endpoint: "Internal Database",
      apiVersion: "v2.0.0",
    },
  ];

  const syncLogs = [
    { id: 1, integration: "DBD", type: "Auto Sync", status: "success", records: 15, time: "2024-01-05 14:30", duration: "2.3s", user: "System" },
    { id: 2, integration: "DBD", type: "Manual Refresh", status: "success", records: 1, time: "2024-01-05 13:15", duration: "1.8s", user: "Admin User" },
    { id: 3, integration: "Product Master", type: "Auto Sync", status: "success", records: 42, time: "2024-01-05 12:00", duration: "0.9s", user: "System" },
    { id: 4, integration: "DBD", type: "Manual Refresh", status: "warning", records: 1, time: "2024-01-05 11:45", duration: "3.1s", user: "Sales Manager", error: "Partial data - Director info unavailable" },
    { id: 5, integration: "DBD", type: "Auto Sync", status: "failed", records: 0, time: "2024-01-05 10:30", duration: "5.0s", user: "System", error: "API timeout - Connection refused" },
  ];

  const productMasterData = [
    { id: "pm-001", code: "STORAGE-MINI", name: "Mini Locker", category: "Storage", linkedCustomers: 145, linkedDeals: 89, linkedContracts: 142, avgPrice: "1,500" },
    { id: "pm-002", code: "STORAGE-SMALL", name: "Small Room", category: "Storage", linkedCustomers: 234, linkedDeals: 156, linkedContracts: 228, avgPrice: "3,500" },
    { id: "pm-003", code: "STORAGE-MEDIUM", name: "Medium Room", category: "Storage", linkedCustomers: 189, linkedDeals: 134, linkedContracts: 183, avgPrice: "5,500" },
    { id: "pm-004", code: "WINE-CLIMATE", name: "Wine Storage (Climate Control)", category: "Specialty", linkedCustomers: 42, linkedDeals: 28, linkedContracts: 40, avgPrice: "12,000" },
    { id: "pm-005", code: "BUSINESS-ARCHIVE", name: "Business Archive", category: "Business", linkedCustomers: 67, linkedDeals: 45, linkedContracts: 65, avgPrice: "8,500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">External Data Integrations</h1>
            <p className="text-muted-foreground mt-1">
              {t("common.language") === "th" 
                ? "จัดการการเชื่อมต่อข้อมูลภายนอกและข้อมูลหลัก" 
                : "Manage external data connections and master data linkage"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1.5">
              <Activity className="h-3 w-3 mr-1.5" />
              2 Integrations Active
            </Badge>
            <Button className="bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white">
              <Link2 className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "overview"
                ? "bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Activity className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setSelectedTab("dbd")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "dbd"
                ? "bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            DBD Integration
          </button>
          <button
            onClick={() => setSelectedTab("master")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "master"
                ? "bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4 inline mr-2" />
            Product/Service Master
          </button>
          <button
            onClick={() => setSelectedTab("logs")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "logs"
                ? "bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Sync Logs
          </button>
          <button
            onClick={() => setSelectedTab("architecture")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "architecture"
                ? "bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Server className="h-4 w-4 inline mr-2" />
            Architecture
          </button>
        </div>

        {/* Content based on selected tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Integration Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <Card key={integration.id} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#705add] flex items-center justify-center">
                          {integration.id === "dbd" ? (
                            <Building2 className="h-6 w-6 text-white" />
                          ) : (
                            <Package className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {t("common.language") === "th" ? integration.nameTh : integration.nameEn}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Last Sync</p>
                        <p className="text-sm font-medium">{integration.lastSync}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                        <p className="text-sm font-medium text-green-600">{integration.successRate}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">{t("integrations.total_syncs")}</p>
                        <p className="text-sm font-medium">{integration.totalSyncs.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">API Version</p>
                        <p className="text-sm font-medium">{integration.apiVersion}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Endpoint</span>
                        <span className="text-xs font-mono">{integration.endpoint}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <RefreshCw className="h-3 w-3 mr-2" />
                        Sync Now
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Shield className="h-3 w-3 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("integrations.total_syncs_today")}</p>
                      <p className="text-2xl font-bold">247</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600">99.2%</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Failed Syncs</p>
                      <p className="text-2xl font-bold text-red-600">2</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold">1.8s</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "dbd" && (
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  DBD Integration Configuration (RQ18)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Configuration Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Connection Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">API Endpoint</span>
                        <span className="text-sm font-mono">https://api.dbd.go.th/v1</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">API Key Status</span>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Valid
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Timeout</span>
                        <span className="text-sm font-medium">30s</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Auto Sync</span>
                        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Enabled</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Data Fields Synced</h3>
                    <div className="space-y-2">
                      {[
                        { field: "Company Registration Number", status: "synced" },
                        { field: "Legal Name (TH/EN)", status: "synced" },
                        { field: "Registered Address", status: "synced" },
                        { field: "Directors Information", status: "synced" },
                        { field: "Company Status", status: "synced" },
                        { field: "Capital Amount", status: "synced" },
                        { field: "Business Type", status: "synced" },
                        { field: "Registration Date", status: "synced" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                          <span className="text-sm">{item.field}</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Data Mapping Table */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Data Mapping</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">DBD Field</th>
                          <th className="text-center p-3 text-sm font-medium">→</th>
                          <th className="text-left p-3 text-sm font-medium">CRM Field</th>
                          <th className="text-left p-3 text-sm font-medium">Access</th>
                          <th className="text-left p-3 text-sm font-medium">Override</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { dbdField: "registration_number", crmField: "company_registration_number", access: "Read-Only", override: "Admin Only" },
                          { dbdField: "legal_name_th", crmField: "company_name_th", access: "Read-Only", override: "With Audit" },
                          { dbdField: "legal_name_en", crmField: "company_name_en", access: "Read-Only", override: "With Audit" },
                          { dbdField: "registered_address", crmField: "billing_address", access: "Read-Only", override: "With Audit" },
                          { dbdField: "directors[]", crmField: "company_directors", access: "Read-Only", override: "No Override" },
                          { dbdField: "company_status", crmField: "company_status", access: "Read-Only", override: "No Override" },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-secondary/20">
                            <td className="p-3 text-sm font-mono text-muted-foreground">{row.dbdField}</td>
                            <td className="p-3 text-center">
                              <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
                            </td>
                            <td className="p-3 text-sm font-mono">{row.crmField}</td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">{row.access}</Badge>
                            </td>
                            <td className="p-3">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  row.override === "No Override" 
                                    ? "border-red-500/20 text-red-600" 
                                    : row.override === "Admin Only"
                                    ? "border-orange-500/20 text-orange-600"
                                    : "border-blue-500/20 text-blue-600"
                                }`}
                              >
                                {row.override}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Security Controls */}
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security & Access Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <h4 className="text-sm font-medium">Role-Based Access</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">Only Admin and Sales Manager can trigger manual sync</p>
                          <div className="pt-2 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Admin</span>
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Sales Manager</span>
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Sales Rep</span>
                              <XCircle className="h-3 w-3 text-red-600" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <h4 className="text-sm font-medium">Audit Logging</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">All sync actions and manual overrides are logged</p>
                          <div className="pt-2 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Sync Actions</span>
                              <Badge variant="outline" className="text-xs">Logged</Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Manual Override</span>
                              <Badge variant="outline" className="text-xs">Logged</Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>API Calls</span>
                              <Badge variant="outline" className="text-xs">Logged</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <h4 className="text-sm font-medium">Data Freshness</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">Warning badges for outdated data (&gt;90 days)</p>
                          <div className="pt-2 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>Fresh (&lt;30d)</span>
                              <Badge className="bg-green-500/10 text-green-600 text-xs">✓</Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Aging (30-90d)</span>
                              <Badge className="bg-yellow-500/10 text-yellow-600 text-xs">⚠</Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Stale (&gt;90d)</span>
                              <Badge className="bg-red-500/10 text-red-600 text-xs">!</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Button className="bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Update API Key
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Audit Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "master" && (
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Product / Service Master Data (RQ61)
                  </CardTitle>
                  <Button className="bg-gradient-to-r from-[#a78bfa] to-[#705add] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product/Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Master Data Table */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Code</th>
                        <th className="text-left p-3 text-sm font-medium">Product/Service Name</th>
                        <th className="text-left p-3 text-sm font-medium">Category</th>
                        <th className="text-center p-3 text-sm font-medium">Linked Customers</th>
                        <th className="text-center p-3 text-sm font-medium">Linked Deals</th>
                        <th className="text-center p-3 text-sm font-medium">Linked Contracts</th>
                        <th className="text-right p-3 text-sm font-medium">Avg Price (THB)</th>
                        <th className="text-center p-3 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {productMasterData.map((product) => (
                        <tr key={product.id} className="hover:bg-secondary/20">
                          <td className="p-3">
                            <span className="text-sm font-mono text-muted-foreground">{product.code}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm font-medium">{product.name}</span>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{product.category}</Badge>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{product.linkedCustomers}</span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Briefcase className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{product.linkedDeals}</span>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <FileText className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm font-medium">{product.linkedContracts}</span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <span className="text-sm font-medium">฿{product.avgPrice}</span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button size="sm" variant="ghost">
                                <Link2 className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                View
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Linkage Architecture */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Master Data Linkage Architecture</h3>
                  <Card className="border bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        {/* Product Master */}
                        <div className="flex-1 text-center">
                          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#705add] mb-3">
                            <Package className="h-10 w-10 text-white" />
                          </div>
                          <h4 className="font-semibold">Product/Service Master</h4>
                          <p className="text-xs text-muted-foreground mt-1">Central Catalog</p>
                        </div>

                        {/* Arrows */}
                        <div className="flex-1 flex items-center justify-center gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <ArrowRight className="h-6 w-6 text-purple-600" />
                            <span className="text-xs font-medium text-purple-600">Links to</span>
                          </div>
                        </div>

                        {/* Linked Entities */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Customers</h5>
                              <p className="text-xs text-muted-foreground">Track service usage</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <Briefcase className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Deals</h5>
                              <p className="text-xs text-muted-foreground">Quote products/services</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Contracts</h5>
                              <p className="text-xs text-muted-foreground">Service agreements</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <h4 className="text-sm font-medium">Multi-Service Support</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Customers can have multiple active services</p>
                        <div className="pt-2">
                          <Badge className="bg-green-500/10 text-green-600 text-xs">
                            Unlimited Services per Customer
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-600" />
                          <h4 className="text-sm font-medium">Usage Tracking</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Track service usage per customer over time</p>
                        <div className="pt-2">
                          <Badge className="bg-blue-500/10 text-blue-600 text-xs">
                            Historical Usage Data
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <h4 className="text-sm font-medium">Segmentation</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Service-based customer segmentation</p>
                        <div className="pt-2">
                          <Badge className="bg-purple-500/10 text-purple-600 text-xs">
                            Smart Segmentation
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "logs" && (
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Sync History & Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium">Time</th>
                        <th className="text-left p-3 text-sm font-medium">Integration</th>
                        <th className="text-left p-3 text-sm font-medium">Type</th>
                        <th className="text-left p-3 text-sm font-medium">Status</th>
                        <th className="text-center p-3 text-sm font-medium">Records</th>
                        <th className="text-center p-3 text-sm font-medium">Duration</th>
                        <th className="text-left p-3 text-sm font-medium">User</th>
                        <th className="text-left p-3 text-sm font-medium">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {syncLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-secondary/20">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{log.time}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{log.integration}</Badge>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-muted-foreground">{log.type}</span>
                          </td>
                          <td className="p-3">
                            {log.status === "success" && (
                              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Success
                              </Badge>
                            )}
                            {log.status === "warning" && (
                              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Warning
                              </Badge>
                            )}
                            {log.status === "failed" && (
                              <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
                                <XCircle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-sm font-medium">{log.records}</span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-sm text-muted-foreground">{log.duration}</span>
                          </td>
                          <td className="p-3">
                            <span className="text-sm">{log.user}</span>
                          </td>
                          <td className="p-3">
                            {log.error ? (
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-3 w-3 text-red-600" />
                                <span className="text-xs text-red-600">{log.error}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "architecture" && (
          <div className="space-y-6">
            {/* Integration Flow Diagram */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Integration Architecture Diagram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-8 rounded-xl border-2 border-dashed">
                  {/* Top Layer - External Sources */}
                  <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">EXTERNAL DATA SOURCES</h3>
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-24 w-48 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white shadow-lg">
                          <Globe className="h-8 w-8 mb-2" />
                          <span className="font-semibold">DBD Thailand</span>
                          <span className="text-xs opacity-80">Government API</span>
                        </div>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          REST API / HTTPS
                        </Badge>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-24 w-48 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex flex-col items-center justify-center text-white shadow-lg">
                          <Database className="h-8 w-8 mb-2" />
                          <span className="font-semibold">Internal Master DB</span>
                          <span className="text-xs opacity-80">Product/Service Catalog</span>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                          PostgreSQL / Direct
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center mb-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 border-l-2 border-dashed border-purple-500" />
                      <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-white rotate-90" />
                      </div>
                      <div className="h-12 border-l-2 border-dashed border-purple-500" />
                    </div>
                  </div>

                  {/* Middle Layer - Integration Gateway */}
                  <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">INTEGRATION LAYER</h3>
                    <div className="max-w-3xl mx-auto">
                      <div className="h-32 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#705add] p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between h-full">
                          <div className="flex-1 text-left">
                            <h4 className="font-semibold mb-2">Integration Gateway</h4>
                            <div className="space-y-1 text-xs opacity-90">
                              <div>✓ Authentication & Authorization</div>
                              <div>✓ Rate Limiting & Throttling</div>
                              <div>✓ Data Validation & Transformation</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-px bg-white/20" />
                            <div className="flex flex-col gap-2">
                              <Badge className="bg-white/20 text-white border-white/30">
                                <Shield className="h-3 w-3 mr-1" />
                                Secure
                              </Badge>
                              <Badge className="bg-white/20 text-white border-white/30">
                                <Activity className="h-3 w-3 mr-1" />
                                Real-time
                              </Badge>
                              <Badge className="bg-white/20 text-white border-white/30">
                                <FileText className="h-3 w-3 mr-1" />
                                Logged
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center mb-8">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 border-l-2 border-dashed border-purple-500" />
                      <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <ArrowRight className="h-5 w-5 text-white rotate-90" />
                      </div>
                      <div className="h-12 border-l-2 border-dashed border-purple-500" />
                    </div>
                  </div>

                  {/* Bottom Layer - CRM Modules */}
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">CRM APPLICATION MODULES</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { icon: Users, title: "Customers", color: "from-blue-500 to-blue-600" },
                        { icon: Briefcase, title: "Deals", color: "from-green-500 to-green-600" },
                        { icon: FileText, title: "Contracts", color: "from-purple-500 to-purple-600" },
                        { icon: Package, title: "Products", color: "from-orange-500 to-orange-600" },
                      ].map((module, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <div className={`h-20 w-full rounded-lg bg-gradient-to-br ${module.color} flex flex-col items-center justify-center text-white shadow`}>
                            <module.icon className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium">{module.title}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Data Consumer
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sync Lifecycle Flow */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Sync Lifecycle Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Trigger",
                      description: "Auto schedule or manual user action",
                      icon: Zap,
                      color: "blue",
                      details: ["Scheduled: Every 6 hours", "Manual: Admin/Sales Manager", "Event-based: New customer added"],
                    },
                    {
                      step: 2,
                      title: "Authentication",
                      description: "Validate API credentials and permissions",
                      icon: Shield,
                      color: "purple",
                      details: ["API Key validation", "Role-based access check", "Rate limit verification"],
                    },
                    {
                      step: 3,
                      title: "Data Fetch",
                      description: "Retrieve data from external source",
                      icon: Database,
                      color: "green",
                      details: ["Connect to DBD API", "Query with registration number", "Retrieve company data"],
                    },
                    {
                      step: 4,
                      title: "Transformation",
                      description: "Map and validate external data",
                      icon: RefreshCw,
                      color: "orange",
                      details: ["Field mapping", "Data validation", "Format conversion"],
                    },
                    {
                      step: 5,
                      title: "Sync",
                      description: "Update CRM database with merged data",
                      icon: CheckCircle2,
                      color: "green",
                      details: ["Update customer record", "Preserve manual overrides", "Log changes"],
                    },
                    {
                      step: 6,
                      title: "Audit",
                      description: "Log sync action and results",
                      icon: FileText,
                      color: "purple",
                      details: ["Record sync timestamp", "Log success/failure", "Track data changes"],
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className={`h-12 w-12 rounded-full bg-${item.color}-500/10 border-2 border-${item.color}-500/20 flex items-center justify-center`}>
                          <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                        </div>
                        {idx < 5 && <div className="h-16 border-l-2 border-dashed border-muted" />}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-secondary text-foreground">Step {item.step}</Badge>
                          <h4 className="font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="space-y-1">
                          {item.details.map((detail, detailIdx) => (
                            <div key={detailIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}