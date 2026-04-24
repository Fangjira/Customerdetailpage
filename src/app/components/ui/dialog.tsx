"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";
import { VisuallyHidden } from "./visually-hidden";

/* ----------------------------- Root ----------------------------- */
function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close {...props} />;
}

/* ----------------------------- Overlay ----------------------------- */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        // 🔥 FIX: ยก z-index ให้สูง + กันโดน block
        "fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "pointer-events-auto",
        className
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = "DialogOverlay";

/* ----------------------------- Content ----------------------------- */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    fullScreen?: boolean;
  }
>(({ className, children, fullScreen = false, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        aria-describedby={undefined}
        {...props}
        className={cn(
          fullScreen
            ? // 🔥 FULLSCREEN MODE
              "fixed inset-0 z-[1001] bg-white overflow-auto"
            : // 🔥 CENTER MODAL MODE (FIX หลัก)
              [
                "fixed z-[1001]",
                "top-1/2 left-1/2",
                "-translate-x-1/2 -translate-y-1/2",
                "w-[95vw] max-w-2xl",
                "max-h-[90vh] overflow-auto",
                "bg-white rounded-xl shadow-2xl border",
                "p-6",
                "duration-200",
                // animation
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
              ].join(" "),
          // 🔥 ป้องกัน class จากข้างนอก override layout สำคัญ
          className
        )}
      >
        {children}

        {/* Close button */}
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-md opacity-70 hover:opacity-100 focus:outline-none"
        >
          <XIcon className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

/* ----------------------------- Header ----------------------------- */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />
  );
}

/* ----------------------------- Footer ----------------------------- */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
        className
      )}
      {...props}
    />
  );
}

/* ----------------------------- Title ----------------------------- */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";

/* ----------------------------- Description ----------------------------- */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

/* ----------------------------- Export ----------------------------- */
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};