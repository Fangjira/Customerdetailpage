import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  type: "search" | "select";
  placeholder: string;
  options?: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

interface FilterBarProps {
  filters: FilterConfig[];
  onClear?: () => void;
  showClearButton?: boolean;
}

export function FilterBar({ filters, onClear, showClearButton = true }: FilterBarProps) {
  const hasActiveFilters = filters.some(f => f.value && f.value !== "all");

  return (
    <Card className="dark:bg-card dark:border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filters.map((filter, index) => (
              <div key={index}>
                {filter.type === "search" ? (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={filter.placeholder}
                      value={filter.value}
                      onChange={(e) => filter.onChange(e.target.value)}
                      className="pl-10 dark:bg-input dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
                    />
                  </div>
                ) : (
                  <Select value={filter.value} onValueChange={filter.onChange}>
                    <SelectTrigger className="dark:bg-input dark:border-border dark:text-foreground">
                      <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-popover dark:border-border">
                      {filter.options?.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="dark:text-popover-foreground dark:focus:bg-accent dark:focus:text-accent-foreground"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
          
          {showClearButton && hasActiveFilters && onClear && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="dark:bg-secondary dark:border-border dark:text-secondary-foreground dark:hover:bg-accent dark:hover:text-accent-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
