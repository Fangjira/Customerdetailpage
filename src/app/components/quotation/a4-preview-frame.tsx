import { ReactNode } from "react";

interface A4PreviewFrameProps {
  children: ReactNode;
  scale?: number;
}

export function A4PreviewFrame({ children, scale = 0.75 }: A4PreviewFrameProps) {
  // A4 dimensions: 210mm x 297mm = 794px x 1123px at 96 DPI
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  return (
    <div className="flex justify-center items-start p-8 bg-gray-100 overflow-auto custom-scrollbar min-h-screen">
      <div
        className="bg-white shadow-2xl"
        style={{
          width: `${A4_WIDTH}px`,
          minHeight: `${A4_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          marginBottom: `${A4_HEIGHT * (1 - scale)}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface A4ContentProps {
  children: ReactNode;
  padding?: string;
}

export function A4Content({ children, padding = "64px" }: A4ContentProps) {
  return (
    <div
      className="w-full h-full"
      style={{
        padding: padding,
      }}
    >
      {children}
    </div>
  );
}
