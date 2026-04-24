import { useEffect, useState } from 'react';
// import { initializeMockData } from '../store/mock-data-initializer';
import { TaskManagerExample } from './task-manager-example';
import { CustomerListExample } from './customer-list-example';
import { Button } from '../components/ui/button';
import { useModuleManager } from '../hooks/use-module-manager';
import { Database, ListTodo, Users, BarChart3 } from 'lucide-react';

/**
 * Comprehensive demo showing the Universal CRUD system in action
 *
 * This component demonstrates:
 * 1. How to initialize mock data
 * 2. How the same hook works across different modules
 * 3. Real-time stats and monitoring
 */
export function UniversalCrudDemo() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'customers' | 'stats'>('tasks');
  const [initialized, setInitialized] = useState(false);

  // Initialize mock data on mount
  useEffect(() => {
    if (!initialized) {
      // initializeMockData();
      setInitialized(true);
    }
  }, [initialized]);

  // Get stats from multiple modules using the SAME hook
  const tasks = useModuleManager('tasks');
  const customers = useModuleManager('customers');
  const deals = useModuleManager('deals');
  const activities = useModuleManager('activities');

  const Stats = () => {
    const taskStats = {
      total: tasks.count,
      open: tasks.findRecords(t => t.status === 'open').length,
      inProgress: tasks.findRecords(t => t.status === 'in_progress').length,
      completed: tasks.findRecords(t => t.status === 'completed').length,
    };

    const customerStats = {
      total: customers.count,
      active: customers.findRecords(c => c.status === 'active').length,
      prospects: customers.findRecords(c => c.status === 'prospect').length,
      inactive: customers.findRecords(c => c.status === 'inactive').length,
    };

    const dealStats = {
      total: deals.count,
      totalValue: deals.records.reduce((sum, d: any) => sum + (d.amount || 0), 0),
      avgValue: deals.count > 0
        ? Math.round(deals.records.reduce((sum, d: any) => sum + (d.amount || 0), 0) / deals.count)
        : 0,
    };

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Universal CRUD System - Live Statistics</h1>
          <p className="text-gray-600">
            Real-time data across all modules using the same <code className="bg-gray-100 px-2 py-1 rounded">useModuleManager()</code> hook
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tasks Stats */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ListTodo className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Tasks</h3>
                <p className="text-2xl font-bold">{taskStats.total}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Open</span>
                <span className="font-semibold">{taskStats.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">In Progress</span>
                <span className="font-semibold">{taskStats.inProgress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{taskStats.completed}</span>
              </div>
            </div>
          </div>

          {/* Customers Stats */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Customers</h3>
                <p className="text-2xl font-bold">{customerStats.total}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active</span>
                <span className="font-semibold text-green-600">{customerStats.active}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prospects</span>
                <span className="font-semibold text-blue-600">{customerStats.prospects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inactive</span>
                <span className="font-semibold text-gray-500">{customerStats.inactive}</span>
              </div>
            </div>
          </div>

          {/* Deals Stats */}
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Deals</h3>
                <p className="text-2xl font-bold">{dealStats.total}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Value</span>
                <span className="font-semibold">${dealStats.totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Value</span>
                <span className="font-semibold">${dealStats.avgValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Activities</span>
                <span className="font-semibold">{activities.count}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="font-semibold mb-4">How It Works</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-600 mb-2">All stats above use the SAME hook pattern:</p>
              <pre className="bg-white p-3 rounded border overflow-x-auto">
{`const tasks = useModuleManager('tasks');
const customers = useModuleManager('customers');
const deals = useModuleManager('deals');

// Get counts
const total = tasks.count;

// Filter records
const openTasks = tasks.findRecords(t => t.status === 'open');

// Calculate totals
const totalValue = deals.records.reduce((sum, d) => sum + d.amount, 0);`}
              </pre>
            </div>
            <div className="flex items-start gap-2 text-green-700 bg-green-50 p-3 rounded">
              <Database className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Zero Hardcoding</p>
                <p className="text-sm text-green-600">
                  Add a new module? Just call <code>useModuleManager('new-module')</code> - no store changes needed!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Quick Actions (See Instant UI Updates!)</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => {
                tasks.createRecord({
                  title: `New Task ${Date.now()}`,
                  status: 'open',
                  priority: 'medium',
                  description: 'Created from stats page',
                });
              }}
            >
              + Add Random Task
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                customers.createRecord({
                  name: `Customer ${Date.now()}`,
                  email: `customer${Date.now()}@example.com`,
                  status: 'prospect',
                });
              }}
            >
              + Add Random Customer
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                deals.createRecord({
                  title: `Deal ${Date.now()}`,
                  customerId: customers.records[0]?.id || 'unknown',
                  amount: Math.floor(Math.random() * 100000) + 10000,
                  stage: 'prospecting',
                  probability: 25,
                });
              }}
            >
              + Add Random Deal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm('Clear all tasks?')) tasks.clearAll();
              }}
            >
              Clear All Tasks
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-6 h-16">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-600" />
              <h1 className="font-bold text-lg">Universal CRUD Demo</h1>
            </div>
            <nav className="flex gap-1">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'stats'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Live Stats
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'tasks'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Task Manager
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'customers'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Customer List
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-6">
        {activeTab === 'stats' && <Stats />}
        {activeTab === 'tasks' && <TaskManagerExample />}
        {activeTab === 'customers' && <CustomerListExample />}
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-4 right-4 bg-white border rounded-lg p-4 shadow-lg max-w-xs">
        <p className="text-xs text-gray-600">
          💡 <strong>Try it:</strong> Add/edit/delete items in any tab, then switch tabs to see all stats update in real-time!
        </p>
      </div>
    </div>
  );
}

export default UniversalCrudDemo;
