/**
 * COMPARISON: Old vs New Approach
 *
 * This file demonstrates the difference between the old hardcoded approach
 * and the new Universal CRUD system.
 */

import { useState } from 'react';
import { useModuleManager } from '../hooks/use-module-manager';

// ============================================================================
// OLD APPROACH - Hardcoded for each module (DON'T DO THIS)
// ============================================================================

interface OldTask {
  id: string;
  title: string;
  status: string;
}

function OldTaskManager() {
  // ❌ Separate state for each module
  const [tasks, setTasks] = useState<OldTask[]>([]);

  // ❌ Manual ID generation
  const generateId = () => `task-${Date.now()}-${Math.random()}`;

  // ❌ Manually write CRUD functions for EVERY module
  const createTask = (title: string) => {
    const newTask: OldTask = {
      id: generateId(),
      title,
      status: 'open',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<OldTask>) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // ❌ Manual filtering
  const openTasks = tasks.filter(t => t.status === 'open');

  return (
    <div>
      <h2>Tasks (Old Way): {tasks.length}</h2>
      <button onClick={() => createTask('New Task')}>Add Task</button>
      {/* Rest of UI... */}
    </div>
  );
}

// Now repeat ALL of this for Customers... then Deals... then Leads... 😱
// That's hundreds of lines of duplicate code!

// ============================================================================
// NEW APPROACH - Universal System (DO THIS!)
// ============================================================================

interface Task {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function NewTaskManager() {
  // ✅ One hook, all CRUD operations included
  const tasks = useModuleManager<Task>('tasks');

  // ✅ No manual CRUD functions needed - all built-in
  // ✅ No ID generation - automatic
  // ✅ No timestamp management - automatic
  // ✅ Filtering is built-in

  const openTasks = tasks.findRecords(t => t.status === 'open');

  return (
    <div>
      <h2>Tasks (New Way): {tasks.count}</h2>
      <button onClick={() => tasks.createRecord({
        title: 'New Task',
        status: 'open'
      })}>
        Add Task
      </button>
      {/* Rest of UI... */}
    </div>
  );
}

// ============================================================================
// SIDE-BY-SIDE CODE COMPARISON
// ============================================================================

export function ComparisonDemo() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Before vs After</h1>
        <p className="text-gray-600">See why the Universal CRUD system is better</p>
      </div>

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* OLD WAY */}
        <div className="space-y-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <h2 className="text-xl font-bold text-red-700 mb-2">❌ Old Way (Hardcoded)</h2>
            <p className="text-sm text-red-600">Every module needs its own state and CRUD functions</p>
          </div>

          <div className="bg-white border rounded-lg p-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-2">For Tasks:</p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`const [tasks, setTasks] = useState([]);

const createTask = (data) => {
  setTasks([...tasks, {
    ...data,
    id: generateId(),
    createdAt: new Date()
  }]);
};

const updateTask = (id, updates) => {
  setTasks(tasks.map(t =>
    t.id === id ? {...t, ...updates} : t
  ));
};

const deleteTask = (id) => {
  setTasks(tasks.filter(t => t.id !== id));
};

// 30+ lines of code`}
              </pre>
            </div>

            <div className="border-t pt-3">
              <p className="font-semibold mb-2 text-red-600">Now copy/paste for every module:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Customers - 30+ lines</li>
                <li>• Deals - 30+ lines</li>
                <li>• Leads - 30+ lines</li>
                <li>• Activities - 30+ lines</li>
                <li>• Quotations - 30+ lines</li>
                <li>• Products - 30+ lines</li>
              </ul>
              <p className="font-bold text-red-700 mt-2">= 180+ lines of duplicate code! 😱</p>
            </div>
          </div>

          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="font-semibold mb-2">Problems:</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>❌ Massive code duplication</li>
              <li>❌ Hard to maintain (fix bug = update 6+ places)</li>
              <li>❌ Inconsistent implementations</li>
              <li>❌ Manual ID/timestamp management</li>
              <li>❌ Adding new module = copy/paste everything</li>
              <li>❌ No shared logic or utilities</li>
            </ul>
          </div>
        </div>

        {/* NEW WAY */}
        <div className="space-y-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h2 className="text-xl font-bold text-green-700 mb-2">✅ New Way (Universal)</h2>
            <p className="text-sm text-green-600">One system works for unlimited modules</p>
          </div>

          <div className="bg-white border rounded-lg p-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-2">For ANY module:</p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`const tasks = useModuleManager('tasks');

// That's it! You get:
tasks.createRecord(data);
tasks.updateRecord(id, updates);
tasks.deleteRecord(id);
tasks.records
tasks.count
tasks.findRecords(predicate)
tasks.batchCreate(records)
tasks.batchDelete(ids)
tasks.clearAll()

// 1 line of code ✨`}
              </pre>
            </div>

            <div className="border-t pt-3">
              <p className="font-semibold mb-2 text-green-600">Works for ALL modules:</p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`// Same pattern, different modules
const customers = useModuleManager('customers');
const deals = useModuleManager('deals');
const leads = useModuleManager('leads');
const activities = useModuleManager('activities');
const quotations = useModuleManager('quotations');
const products = useModuleManager('products');`}
              </pre>
              <p className="font-bold text-green-700 mt-2">= 6 lines total! 🎉</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="font-semibold mb-2">Benefits:</p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>✅ Zero code duplication</li>
              <li>✅ Single source of truth (fix once, fixes everywhere)</li>
              <li>✅ Consistent across all modules</li>
              <li>✅ Auto ID/timestamp management</li>
              <li>✅ New module = 1 line of code</li>
              <li>✅ Type-safe with TypeScript</li>
              <li>✅ Batch operations included</li>
              <li>✅ Built-in filtering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real Example */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Real-World Example</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 bg-red-50">
            <h3 className="font-bold mb-3 text-red-700">Old: Adding a "Products" module</h3>
            <ol className="text-sm space-y-2 text-gray-700">
              <li>1. Create useState for products ✏️</li>
              <li>2. Write createProduct function ✏️</li>
              <li>3. Write updateProduct function ✏️</li>
              <li>4. Write deleteProduct function ✏️</li>
              <li>5. Write getProduct function ✏️</li>
              <li>6. Write ID generator ✏️</li>
              <li>7. Handle timestamps ✏️</li>
              <li>8. Test everything ✏️</li>
            </ol>
            <p className="mt-4 font-bold text-red-600">Time: ~30 minutes 😓</p>
            <p className="font-bold text-red-600">Code: ~40 lines</p>
          </div>

          <div className="border rounded-lg p-6 bg-green-50">
            <h3 className="font-bold mb-3 text-green-700">New: Adding a "Products" module</h3>
            <ol className="text-sm space-y-2 text-gray-700">
              <li>1. Use the hook:</li>
            </ol>
            <pre className="mt-2 bg-white p-3 rounded text-xs border">
{`const products = useModuleManager('products');`}
            </pre>
            <p className="mt-4 font-bold text-green-600">Time: ~5 seconds ⚡</p>
            <p className="font-bold text-green-600">Code: 1 line</p>
            <p className="mt-3 text-sm text-green-700">✨ Everything works instantly - create, read, update, delete, filter, batch operations!</p>
          </div>
        </div>
      </div>

      {/* The Numbers */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">By The Numbers</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-5xl font-bold text-blue-600">97%</p>
            <p className="text-sm text-gray-600 mt-2">Less code</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-purple-600">10x</p>
            <p className="text-sm text-gray-600 mt-2">Faster development</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-green-600">∞</p>
            <p className="text-sm text-gray-600 mt-2">Modules supported</p>
          </div>
        </div>
      </div>
    </div>
  );
}
