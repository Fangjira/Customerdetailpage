import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortDirection } from '../hooks/use-table-sort';

interface SortableHeaderProps {
  column: string;
  currentColumn: string | null;
  direction: SortDirection;
  onSort: (column: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function SortableHeader({
  column,
  currentColumn,
  direction,
  onSort,
  children,
  className = '',
}: SortableHeaderProps) {
  const isActive = currentColumn === column;

  return (
    <th
      className={`cursor-pointer select-none hover:bg-gray-100 transition-colors ${className}`}
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-1">
        <span>{children}</span>
        <div className="flex flex-col w-4">
          {isActive && direction === 'asc' && (
            <ArrowUp className="h-3 w-3 text-primary" />
          )}
          {isActive && direction === 'desc' && (
            <ArrowDown className="h-3 w-3 text-primary" />
          )}
          {!isActive && (
            <div className="h-3 w-3 opacity-30">
              <ArrowUp className="h-2 w-2" />
              <ArrowDown className="h-2 w-2" />
            </div>
          )}
        </div>
      </div>
    </th>
  );
}
