import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // Automatically add readOnly if value is provided without onChange
    const shouldBeReadOnly =
      props.value !== undefined &&
      props.value !== null &&
      !props.onChange &&
      !props.readOnly &&
      !props.disabled;

    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base text-foreground bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
        readOnly={shouldBeReadOnly || props.readOnly}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };