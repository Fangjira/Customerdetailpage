import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export function useTableSort<T>(data: T[], defaultColumn?: string) {
  const [sortState, setSortState] = useState<SortState>({
    column: defaultColumn || null,
    direction: null,
  });

  const handleSort = (column: string) => {
    setSortState((prev) => {
      if (prev.column !== column) {
        // New column selected - start with ascending
        return { column, direction: 'asc' };
      }
      
      // Same column - cycle through: asc → desc → null
      if (prev.direction === null) {
        return { column, direction: 'asc' };
      } else if (prev.direction === 'asc') {
        return { column, direction: 'desc' };
      } else {
        return { column: null, direction: null };
      }
    });
  };

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortState.column!];
      const bValue = (b as any)[sortState.column!];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Handle different types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue, 'th-TH');
        return sortState.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle dates
      if (aValue instanceof Date && bValue instanceof Date) {
        const comparison = aValue.getTime() - bValue.getTime();
        return sortState.direction === 'asc' ? comparison : -comparison;
      }

      // Try to parse as date strings
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        const comparison = aDate.getTime() - bDate.getTime();
        return sortState.direction === 'asc' ? comparison : -comparison;
      }

      // Fallback to string comparison
      const comparison = String(aValue).localeCompare(String(bValue), 'th-TH');
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState]);

  return {
    sortedData,
    sortState,
    handleSort,
  };
}
