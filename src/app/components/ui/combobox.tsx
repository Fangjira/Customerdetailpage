import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  allowCreate?: boolean;
  createText?: string;
  onCreate?: (value: string) => void;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  className,
  allowCreate = false,
  createText = "Create new option",
  onCreate,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const selectedOption = options.find((option) => option.value === value);

  // Check if search value matches any existing option
  const isExistingOption = options.some(
    (option) => option.value.toLowerCase() === searchValue.toLowerCase()
  );

  const handleCreateNew = () => {
    if (searchValue.trim() && onCreate) {
      onCreate(searchValue.trim());
      setSearchValue("");
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          
          <CommandList>
            {options.filter((option) =>
              option.label.toLowerCase().includes(searchValue.toLowerCase())
            ).length === 0 ? (
              <CommandEmpty>
                {allowCreate && searchValue.trim() ? (
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={handleCreateNew}
                    >
                      <Plus className="mr-2 h-4 w-4 text-[#7BC9A6]" />
                      <span>{createText}: <strong>"{searchValue}"</strong></span>
                    </Button>
                  </div>
                ) : (
                  emptyText
                )}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {options
                  .filter((option) =>
                    option.label.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        onValueChange?.(
                          currentValue === value ? "" : currentValue
                        );
                        setSearchValue("");
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
            {allowCreate && searchValue.trim() && !isExistingOption && options.filter((option) =>
              option.label.toLowerCase().includes(searchValue.toLowerCase())
            ).length > 0 && (
              <CommandGroup>
                <CommandItem
                  value="__create_new__"
                  onSelect={handleCreateNew}
                  className="border-t"
                >
                  <Plus className="mr-2 h-4 w-4 text-[#7BC9A6]" />
                  <span>{createText}: <strong>"{searchValue}"</strong></span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}