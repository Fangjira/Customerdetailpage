# Integration Guide - Universal CRUD System

## Quick Start: Add to Existing App

### Option 1: Standalone Demo Route (Recommended for Testing)

Add the Universal CRUD Demo as a new route in your existing app:

```tsx
// In your App.tsx, add the import
import { UniversalCrudDemo } from "./examples/universal-crud-demo";

// In your routing logic, add a new route
case currentPath === "/crud-demo":
  return <UniversalCrudDemo />;
```

Then add it to your navigation menu to access it.

### Option 2: Replace Existing Task/Customer Screens

If you want to use the new universal system for your existing screens:

```tsx
// In App.tsx, replace existing imports
import { TasksScreen } from "./components/screens/tasks-screen";  // OLD
import { TaskManagerExample } from "./examples/task-manager-example";  // NEW

// Update your routing
case currentPath === "/tasks":
  return <TaskManagerExample />;  // Instead of <TasksScreen />
```

### Option 3: Initialize and Use Throughout App

To make the universal CRUD system available everywhere:

**Step 1:** Initialize mock data in App.tsx

```tsx
import { useEffect } from 'react';
import { initializeMockData } from './store/mock-data-initializer';

function App() {
  useEffect(() => {
    // Initialize once when app loads
    initializeMockData();
  }, []);

  // Rest of your app...
}
```

**Step 2:** Use in any component

```tsx
import { useModuleManager } from '../hooks/use-module-manager';

function AnyComponent() {
  const tasks = useModuleManager('tasks');
  const customers = useModuleManager('customers');
  
  // Now you have instant CRUD operations
  return (
    <div>
      <p>Tasks: {tasks.count}</p>
      <p>Customers: {customers.count}</p>
      <button onClick={() => tasks.createRecord({ 
        title: 'New task',
        status: 'open',
        priority: 'medium'
      })}>
        Add Task
      </button>
    </div>
  );
}
```

## Migrating Existing Components

### Before (Hardcoded State)

```tsx
// Old approach - hardcoded for each module
const [tasks, setTasks] = useState([]);

const createTask = (task) => {
  setTasks([...tasks, { ...task, id: generateId() }]);
};

const updateTask = (id, updates) => {
  setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
};

const deleteTask = (id) => {
  setTasks(tasks.filter(t => t.id !== id));
};
```

### After (Universal System)

```tsx
// New approach - works for ANY module
const tasks = useModuleManager('tasks');

// All operations are built-in
tasks.createRecord({ title: 'New Task', status: 'open', priority: 'high' });
tasks.updateRecord(taskId, { status: 'completed' });
tasks.deleteRecord(taskId);
```

## Benefits of Migration

1. **Less Code**: No more duplicate CRUD logic in every component
2. **Consistency**: All modules work the same way
3. **Type Safety**: Full TypeScript support
4. **Auto Features**: Timestamps, ID generation, batch operations all included
5. **Scalability**: Add new modules without changing the store

## Adding Your Own Modules

### Step 1: Define the Interface

```typescript
// In your types file or component
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}
```

### Step 2: Use Immediately

```tsx
function ProductsPage() {
  const products = useModuleManager<Product>('products');
  
  // It just works! No store configuration needed.
  return (
    <div>
      {products.records.map(product => (
        <div key={product.id}>
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}
```

### Step 3 (Optional): Add Mock Data

```typescript
// In mock-data-initializer.ts
export const initializeMockData = () => {
  const store = useUniversalCrudStore.getState();
  
  // Add your module
  store.initializeModule('products', [
    { id: 'p1', name: 'Product 1', price: 99.99, category: 'Electronics' },
    { id: 'p2', name: 'Product 2', price: 49.99, category: 'Books' },
  ]);
};
```

## Testing the System

1. **Visit the demo**: Add route to `/crud-demo` and open in browser
2. **Live updates**: Create items in one tab, see stats update immediately
3. **Cross-module**: Changes in Task Manager reflect in Live Stats instantly
4. **Type safety**: Try using wrong types - TypeScript will catch it

## Common Patterns

### Pattern 1: Filtered Lists

```tsx
const tasks = useModuleManager('tasks');
const openTasks = tasks.findRecords(t => t.status === 'open');
const highPriority = tasks.findRecords(t => t.priority === 'high');
```

### Pattern 2: Relationships

```tsx
const customers = useModuleManager('customers');
const deals = useModuleManager('deals');

// Get customer's deals
const customerDeals = deals.findRecords(d => d.customerId === customerId);
```

### Pattern 3: Bulk Operations

```tsx
const tasks = useModuleManager('tasks');

// Import multiple tasks
tasks.batchCreate([
  { title: 'Task 1', status: 'open', priority: 'high' },
  { title: 'Task 2', status: 'open', priority: 'medium' },
  { title: 'Task 3', status: 'open', priority: 'low' },
]);

// Delete completed tasks
const completedIds = tasks.findRecords(t => t.status === 'completed')
  .map(t => t.id);
tasks.batchDelete(completedIds);
```

## Need Help?

- See working examples in `/src/app/examples/`
- Read the main README: `UNIVERSAL_CRUD_README.md`
- Check the store implementation: `universal-crud-store.ts`
- Look at the hook: `use-module-manager.ts`
