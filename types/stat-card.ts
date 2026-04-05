import type { HexColor } from "@/types/common";

export interface StatCardConfig<TStats, TLabel extends string = string> {
  label:       TLabel;
  borderColor: HexColor;
  subColor:    HexColor;
  getValue: (stats: TStats) => number;
  getSub:   (stats: TStats) => string;
}
