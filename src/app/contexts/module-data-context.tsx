import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { useModuleStore } from "../store/module-store";

export interface NormalizedTaskRecord {
  id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
  dueDate?: string;
  dueTime?: string;
  assignee?: string;
  assignees?: string[];
  attendees?: string[];
  customer?: string;
  location?: string;
  activityType?: string;
  titleType?: string;
  isActivity?: boolean;
  [key: string]: any;
}

interface ModuleDataContextType {
  tasks: NormalizedTaskRecord[];
  taskActivities: NormalizedTaskRecord[];
}

const ModuleDataContext = createContext<ModuleDataContextType | undefined>(undefined);

export function ModuleDataProvider({ children }: { children: ReactNode }) {
  const storeTasks = useModuleStore((state) => state.modules.tasks || []);

  const tasks = useMemo<NormalizedTaskRecord[]>(() => {
    const normalized = (storeTasks as any[]).map((task) => ({
      ...task,
      id: String(task.id),
      title: String(task.title || ""),
      description: String(task.description || ""),
      status: String(task.status || "todo"),
      dueDate: task.dueDate || "",
      dueTime: task.dueTime || "",
      assignee: task.assignee || "",
      assignees: task.assignees || [],
      attendees: task.attendees || [],
      activityType: task.activityType || task.titleType || "",
      titleType: task.titleType || task.activityType || "",
    }));

    // De-duplicate by id while preserving last record.
    return Array.from(new Map(normalized.map((task) => [task.id, task])).values());
  }, [storeTasks]);

  const taskActivities = useMemo(
    () => tasks.filter((task) => Boolean(task.isActivity)),
    [tasks]
  );

  const value = useMemo(
    () => ({ tasks, taskActivities }),
    [tasks, taskActivities]
  );

  return <ModuleDataContext.Provider value={value}>{children}</ModuleDataContext.Provider>;
}

export function useModuleData() {
  const context = useContext(ModuleDataContext);
  if (!context) {
    throw new Error("useModuleData must be used within a ModuleDataProvider");
  }
  return context;
}

