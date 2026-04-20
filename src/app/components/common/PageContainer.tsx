import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "full" | "7xl" | "6xl" | "5xl";
}

const maxWidthClasses = {
  full: "",
  "7xl": "max-w-7xl mx-auto",
  "6xl": "max-w-6xl mx-auto",
  "5xl": "max-w-5xl mx-auto",
};

export function PageContainer({ children, maxWidth = "full" }: PageContainerProps) {
  return (
    <div className={`p-6 md:p-8 space-y-6 ${maxWidthClasses[maxWidth]}`}>
      {children}
    </div>
  );
}
