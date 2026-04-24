import { useState } from 'react';
import { useModuleManager } from '../hooks/use-module-manager';
import { Task } from '@/types/crm';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

/**
 * Example component showing how to use useModuleManager for Tasks
 */
export function TaskManagerExample() {
  // Use the universal hook with 'tasks' module
  const tasks = useModuleManager<Task>('tasks');

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;

    tasks.createRecord({
      title: newTaskTitle,
      description: '',
      status: 'open',
      priority: 'medium',
    });

    setNewTaskTitle('');
  };

  const handleToggleStatus = (task: Task) => {
    const newStatus = task.status === 'completed' ? 'open' : 'completed';
    tasks.updateRecord(task.id, { status: newStatus });
  };

  const handleDeleteTask = (id: string) => {
    tasks.deleteRecord(id);
  };

  const openTasks = tasks.findRecords((t) => t.status !== 'completed');
  const completedTasks = tasks.findRecords((t) => t.status === 'completed');

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Task Manager</h1>
        <p className="text-gray-600">
          Total: {tasks.count} | Open: {openTasks.length} | Completed: {completedTasks.length}
        </p>
      </div>

      {/* Create Task */}
      <div className="flex gap-2">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateTask()}
          placeholder="Enter task title..."
          className="flex-1"
        />
        <Button onClick={handleCreateTask}>Add Task</Button>
      </div>

      {/* Open Tasks */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Open Tasks</h2>
        {openTasks.length === 0 ? (
          <p className="text-gray-500 italic">No open tasks</p>
        ) : (
          <div className="space-y-2">
            {openTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
              >
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="text-gray-400 hover:text-green-600"
                >
                  <Circle className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-gray-500">{task.description}</div>
                  )}
                  {task.dueDate && (
                    <div className="text-xs text-gray-400 mt-1">Due: {task.dueDate}</div>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Completed Tasks</h2>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 opacity-75"
              >
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="text-green-600"
                >
                  <CheckCircle2 className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <div className="font-medium line-through">{task.title}</div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
