import { useCallback, useMemo } from 'react';
import { useModuleStore, BaseRecord } from '../store/module-store';

/**
 * Universal Hook for managing any module's CRUD operations.
 * Use it like: const { records, createRecord } = useModuleManager('tasks');
 */
export function useModuleManager<T extends BaseRecord = BaseRecord>(moduleName: string) {
  const store = useModuleStore();

  // Optimized selector for the specific module's records
  const records = useMemo(() => {
    return (store.modules[moduleName] || []) as T[];
  }, [store.modules, moduleName]);

  const createRecord = useCallback(
    (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
      store.upsertRecord(moduleName, data);
    },
    [moduleName, store]
  );

  const updateRecord = useCallback(
    (id: string, data: Partial<T>) => {
      store.upsertRecord(moduleName, { ...data, id });
    },
    [moduleName, store]
  );

  const deleteRecord = useCallback(
    (id: string) => {
      store.deleteRecord(moduleName, id);
    },
    [moduleName, store]
  );

  const getRecordById = useCallback(
    (id: string) => {
      return records.find((r) => r.id === id);
    },
    [records]
  );

  const findRecords = useCallback(
    (predicate: (record: T) => boolean) => {
      return records.filter(predicate);
    },
    [records]
  );

  // Return CRUD API
  return {
    records,             // The array of records for this module
    count: records.length,
    createRecord,
    updateRecord,
    deleteRecord,
    getRecordById,
    findRecords,
    isLoading: false,    // In-memory is always "loaded"
  };
}
