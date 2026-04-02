import type { ReactNode } from "react";
import type { HexColor } from "@/types/common";

export function renderDotOption(dotColor: HexColor, label: ReactNode): ReactNode {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
      {label}
    </div>
  );
}
