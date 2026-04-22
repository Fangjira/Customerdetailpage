import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

/**
 * Universal dynamic record structure.
 * Every record MUST have at least an 'id' and 'updatedAt'.
 */
export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

interface ModuleState {
  // Dictionary where key is module name (e.g. 'tasks', 'leads')
  modules: Record<string, BaseRecord[]>;

  // Actions
  upsertRecord: (moduleName: string, data: Partial<BaseRecord>) => void;
  deleteRecord: (moduleName: string, id: string) => void;
  initializeModule: (moduleName: string, initialData: BaseRecord[]) => void;
}

/**
 * Truly Universal In-Memory Store
 */
export const useModuleStore = create<ModuleState>((set) => ({
  modules: {
    // Initial Mock Data
    customers: [
      { id: 'cust-1', name: 'Acme Corp', industry: 'Tech', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 'cust-2', name: 'Global Logistics', industry: 'Shipping', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
    deals: [
      { id: 'deal-1', title: 'Q2 Logistics Expansion', value: 250000, status: 'negotiation', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ],
    tasks: [
      { 
        id: 'TASK-VISIT-01', 
        title: 'Contract Signing - SCGJWD', 
        priority: 'high', 
        dueDate: '2026-04-21', 
        dueTime: '10:00 AM',
        isActivity: true,
        activityType: 'customer_visit',
        customer: 'SCGJWD Logistics',
        assignee: 'สมชาย วงศ์สกุล',
        status: 'in-progress',
        location: 'สำนักงานบางซื่อ',
        description: 'คุยเรื่องแผนการขยายคลังสินค้าปี 2026 และเซ็นสัญญาความร่วมมือ',
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      {
        id: "TASK-MEETING-01",
        title: "นัดหมายลูกค้า - Schedule meeting: CP All",
        description: "นำเสนอ Solution ระบบจัดการขนส่งใหม่",
        priority: "medium",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "02:30 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customer: "CP All Public Company",
        activityType: "meeting",
        isActivity: true,
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      {
        id: "TASK-SHARED-VISIT-02",
        title: "Customer Visit: PTT Group",
        description: "คุยเรื่องงานวางระบบคลังสินค้าอัจฉริยะ คุณแฮมทาโร่แชร์มาให้ร่วมสังเกตการณ์",
        priority: "medium",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "01:00 PM",
        assignee: "สมชาย วงศ์สกุล",
        attendees: ["คุณแฮมทาโร่", "สมชาย วงศ์สกุล"],
        completed: false,
        customer: "PTT Public Company Limited",
        activityType: "customer_visit",
        isActivity: true,
        createdBy: { id: "hamtaro-id", name: "แฮมทาโร่" },
        note: "Joining as an observer",
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      {
        id: "TASK-MULTI-CUST-01",
        title: "Industrial Zone Sync",
        description: "รวบรวมความต้องการจากกลุ่มลูกค้าในนิคมฯ อมตะ",
        priority: "low",
        status: "todo",
        dueDate: "2026-04-21",
        dueTime: "03:30 PM",
        assignee: "สมชาย วงศ์สกุล",
        completed: false,
        customers: ["Amata Corp", "WHA Group", "Thai Factory"],
        activityType: "meeting",
        isActivity: true,
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      }
    ],
  },

  initializeModule: (moduleName, initialData) =>
    set((state) => ({
      modules: {
        ...state.modules,
        [moduleName]: initialData,
      },
    })),

  upsertRecord: (moduleName, data) =>
    set((state) => {
      const currentModuleData = state.modules[moduleName] || [];
      const now = new Date().toISOString();

      if (data.id) {
        // Update existing
        return {
          modules: {
            ...state.modules,
            [moduleName]: currentModuleData.map((item) =>
              item.id === data.id ? { ...item, ...data, updatedAt: now } : item
            ),
          },
        };
      } else {
        // Create new
        const newRecord: BaseRecord = {
          ...data,
          id: uuidv4(),
          createdAt: now,
          updatedAt: now,
        } as BaseRecord;

        return {
          modules: {
            ...state.modules,
            [moduleName]: [newRecord, ...currentModuleData],
          },
        };
      }
    }),

  deleteRecord: (moduleName, id) =>
    set((state) => ({
      modules: {
        ...state.modules,
        [moduleName]: (state.modules[moduleName] || []).filter((item) => item.id !== id),
      },
    })),
}));
