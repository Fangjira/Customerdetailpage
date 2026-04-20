import { Card, CardContent } from "../ui/card";
import { ReactNode } from "react";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function DataTable({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
  isLoading = false,
}: DataTableProps) {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <Card className="overflow-hidden dark:bg-card dark:border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-secondary/50 dark:bg-[var(--table-header-bg)] border-b border-border dark:border-[var(--table-border)]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 font-semibold text-foreground dark:text-[var(--table-header-text)] ${getAlignClass(
                      column.align
                    )}`}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border dark:divide-[var(--table-border)]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    onClick={() => onRowClick?.(row)}
                    className={`
                      bg-card dark:bg-[var(--table-row-bg)]
                      transition-colors
                      ${
                        onRowClick
                          ? "cursor-pointer hover:bg-secondary/30 dark:hover:bg-[var(--table-row-hover)]"
                          : ""
                      }
                    `}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 text-foreground dark:text-card-foreground ${getAlignClass(
                          column.align
                        )}`}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
