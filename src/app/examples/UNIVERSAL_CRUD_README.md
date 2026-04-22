# Universal In-Memory CRUD System

A truly dynamic, module-agnostic CRUD system for your Enterprise CRM prototype that works with **unlimited modules** without hardcoding.

## 🎯 Features

- ✅ **Zero Hardcoding**: No `state.tasks`, `state.leads`, etc. Everything is dynamic
- ✅ **One Universal Hook**: `useModuleManager(moduleName)` works for ANY module
- ✅ **Instant UI Updates**: All changes are optimistic and immediate
- ✅ **Type-Safe**: Full TypeScript support with generic types
- ✅ **Battery Included**: Create, Read, Update, Delete, Batch operations, Filtering
- ✅ **No Backend Required**: 100% in-memory state with Zustand

## 📁 File Structure

```
src/app/
├── store/
│   ├── universal-crud-store.ts      # Dynamic Zustand store
│   └── mock-data-initializer.ts     # Initialize with sample data
├── hooks/
│   └── use-module-manager.ts        # Universal hook for any module
└── examples/
    ├── task-manager-example.tsx     # Example: Using with Tasks
    ├── customer-list-example.tsx    # Example: Using with Customers
    └── UNIVERSAL_CRUD_README.md     # This file
```

## 🚀 Quick Start

### 1. Initialize Mock Data (One-time setup)

In your `App.tsx` or main entry point:

```tsx
import { useEffect } from 'react';
import { initializeMockData } from './store/mock-data-initializer';

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return <YourApp />;
}
```

### 2. Use in ANY Component

The exact same hook works for **any module**:

```tsx
import { useModuleManager } from '../hooks/use-module-manager';

// For Tasks
function TaskComponent() {
  const tasks = useModuleManager('tasks');
  // tasks.records, tasks.createRecord(), tasks.updateRecord(), etc.
}

// For Customers
function CustomerComponent() {
  const customers = useModuleManager('customers');
  // customers.records, customers.createRecord(), customers.updateRecord(), etc.
}

// For ANY new module - no code changes needed!
function ProductComponent() {
  const products = useModuleManager('products');
  // products.records, products.createRecord(), products.updateRecord(), etc.
}
```

## 🔧 API Reference

### `useModuleManager<T>(moduleName: string)`

Returns a `ModuleManager<T>` with these properties and methods:

| Property/Method | Type | Description |
|----------------|------|-------------|
| `records` | `T[]` | All records in the module |
| `count` | `number` | Total number of records |
| `getRecord(id)` | `(id: string) => T \| undefined` | Get single record by ID |
| `createRecord(data)` | `(data: Omit<T, 'id' \| 'createdAt' \| 'updatedAt'>) => T` | Create new record (auto-generates id, timestamps) |
| `updateRecord(id, updates)` | `(id: string, updates: Partial<T>) => void` | Update existing record (auto-updates timestamp) |
| `deleteRecord(id)` | `(id: string) => void` | Delete record by ID |
| `batchCreate(records)` | `(records: Omit<T, 'id' \| 'createdAt' \| 'updatedAt'>[]) => T[]` | Create multiple records at once |
| `batchDelete(ids)` | `(ids: string[]) => void` | Delete multiple records at once |
| `clearAll()` | `() => void` | Clear all records in the module |
| `findRecords(predicate)` | `(predicate: (record: T) => boolean) => T[]` | Filter records by condition |

## 💡 Usage Examples

### Example 1: Tasks Module

```tsx
import { useModuleManager } from '../hooks/use-module-manager';
import { Task } from '../store/mock-data-initializer';

function TaskList() {
  const tasks = useModuleManager<Task>('tasks');

  // Create
  const addTask = () => {
    tasks.createRecord({
      title: 'New Task',
      description: 'Task description',
      status: 'open',
      priority: 'high',
    });
  };

  // Update
  const completeTask = (id: string) => {
    tasks.updateRecord(id, { status: 'completed' });
  };

  // Delete
  const deleteTask = (id: string) => {
    tasks.deleteRecord(id);
  };

  // Filter
  const openTasks = tasks.findRecords(t => t.status === 'open');
  const highPriorityTasks = tasks.findRecords(t => t.priority === 'high');

  return (
    <div>
      <h2>Tasks ({tasks.count})</h2>
      <h3>Open Tasks ({openTasks.length})</h3>
      {openTasks.map(task => (
        <div key={task.id}>
          {task.title}
          <button onClick={() => completeTask(task.id)}>Complete</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Customers Module

```tsx
import { useModuleManager } from '../hooks/use-module-manager';
import { Customer } from '../store/mock-data-initializer';

function CustomerList() {
  const customers = useModuleManager<Customer>('customers');

  // Create
  const addCustomer = () => {
    customers.createRecord({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0000',
      company: 'Acme Corp',
      industry: 'Technology',
      status: 'active',
    });
  };

  // Batch operations
  const importCustomers = () => {
    customers.batchCreate([
      { name: 'Customer 1', email: 'c1@example.com', status: 'prospect' },
      { name: 'Customer 2', email: 'c2@example.com', status: 'prospect' },
      { name: 'Customer 3', email: 'c3@example.com', status: 'prospect' },
    ]);
  };

  // Advanced filtering
  const activeCustomers = customers.findRecords(c => c.status === 'active');
  const techCustomers = customers.findRecords(c => c.industry === 'Technology');

  return (
    <div>
      <h2>Customers ({customers.count})</h2>
      <button onClick={addCustomer}>Add Customer</button>
      <button onClick={importCustomers}>Import 3 Customers</button>
      
      <h3>Active Customers ({activeCustomers.length})</h3>
      {activeCustomers.map(customer => (
        <div key={customer.id}>
          {customer.name} - {customer.company}
        </div>
      ))}
    </div>
  );
}
```

### Example 3: ANY New Module (No Code Changes!)

```tsx
import { useModuleManager } from '../hooks/use-module-manager';

// Define your type
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

function ProductCatalog() {
  // Same hook, different module - it just works!
  const products = useModuleManager<Product>('products');

  const addProduct = () => {
    products.createRecord({
      name: 'Widget Pro',
      price: 99.99,
      category: 'Electronics',
      stock: 100,
    });
  };

  const lowStockProducts = products.findRecords(p => p.stock < 20);

  return (
    <div>
      <h2>Products ({products.count})</h2>
      <button onClick={addProduct}>Add Product</button>
      
      {lowStockProducts.length > 0 && (
        <div className="alert">
          ⚠️ {lowStockProducts.length} products are low on stock!
        </div>
      )}

      {products.records.map(product => (
        <div key={product.id}>
          {product.name} - ${product.price} ({product.stock} in stock)
          <button onClick={() => products.updateRecord(product.id, { 
            stock: product.stock + 10 
          })}>
            Restock +10
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 🎨 Working Examples

See complete, working examples:
- **Tasks**: `src/app/examples/task-manager-example.tsx`
- **Customers**: `src/app/examples/customer-list-example.tsx`

## 🔐 Type Safety

Define your module's interface:

```typescript
interface MyModule extends BaseRecord {
  // Your fields here
  customField: string;
  anotherField: number;
}

const myData = useModuleManager<MyModule>('my-module');
// Now TypeScript knows about customField and anotherField
```

## 🌟 Key Benefits

1. **Add New Modules Instantly**: Just call `useModuleManager('new-module-name')` - no store changes needed
2. **Consistent API**: Every module has the same methods - learn once, use everywhere
3. **Optimistic Updates**: UI updates immediately without waiting for "backend"
4. **Auto Timestamps**: `createdAt` and `updatedAt` are managed automatically
5. **Auto ID Generation**: Never worry about generating unique IDs manually

## 🚨 Important Notes

- Module names are case-sensitive: `'tasks'` ≠ `'Tasks'`
- All records must extend `BaseRecord` (includes `id`, `createdAt`, `updatedAt`)
- State persists only in memory - refresh will reset data
- For persistence, you can later add localStorage or connect to a real backend without changing the hook API

## 🔄 Migration Path

When you're ready to connect to a real backend:

1. Keep using `useModuleManager(moduleName)` in your components (no changes!)
2. Modify the store implementation to call APIs instead of updating local state
3. Your entire UI code stays the same - that's the power of abstraction!

---

**Built for Enterprise CRM prototyping - Scale from 1 to 100+ modules with zero refactoring.**
