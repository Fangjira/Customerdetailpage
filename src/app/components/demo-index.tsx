import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Calendar,
  FileText,
  LayoutDashboard,
  Package,
  Rocket,
  ArrowRight
} from "lucide-react";

interface DemoIndexProps {
  onNavigate: (path: string) => void;
}

export function DemoIndex({ onNavigate }: DemoIndexProps) {
  const demos = [
    {
      title: "Task & Activity Detail Modal",
      description: "8 comprehensive scenarios for task and activity detail views",
      icon: Calendar,
      path: "/task-activity-modal-demo",
      color: "from-emerald-500 to-emerald-600",
      badge: "NEW",
    },
    {
      title: "Quotation Builder",
      description: "Multi-template quotation creation and management",
      icon: FileText,
      path: "/quotation-builder-demo",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "OneLinkCRM Demo",
      description: "Mini CRM clean UI demonstration",
      icon: LayoutDashboard,
      path: "/onelink-demo",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "OneLinkCRM Dashboard",
      description: "Dashboard view for OneLinkCRM",
      icon: LayoutDashboard,
      path: "/onelink-dashboard",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "OneLinkCRM Deals",
      description: "Deals management interface",
      icon: Package,
      path: "/onelink-deals",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-4">
            <Rocket className="h-4 w-4" />
            <span className="text-sm font-semibold">Demo Center</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            CRM Components & Demos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our component library and interactive demonstrations
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <Card
                key={demo.path}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-gray-300 relative overflow-hidden"
                onClick={() => onNavigate(demo.path)}
              >
                {demo.badge && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                    {demo.badge}
                  </div>
                )}
                <CardContent className="p-6">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${demo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">
                    {demo.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
                    {demo.description}
                  </p>

                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-emerald-500"
                    size="sm"
                  >
                    <span>View Demo</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border-2 border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3">Navigation</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Direct URLs:</strong> You can navigate directly to any demo using the paths above</p>
            <p>• <strong>Example:</strong> Type <code className="bg-gray-100 px-2 py-1 rounded">/task-activity-modal-demo</code> in your browser</p>
            <p>• <strong>Back Button:</strong> Use your browser's back button or the app's navigation to return</p>
          </div>
        </div>

        {/* Quick Access Paths */}
        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border-2 border-emerald-200">
          <h3 className="font-bold text-gray-900 mb-3">Quick Access Paths</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {demos.map((demo) => (
              <div key={demo.path} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                <code className="text-xs bg-gray-100 px-3 py-1 rounded flex-1 font-mono text-gray-700">
                  {demo.path}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate(demo.path)}
                  className="text-xs"
                >
                  Go
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
