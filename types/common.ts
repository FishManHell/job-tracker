export const AntdTagColor = {
  BLUE:    "blue",
  PURPLE:  "purple",
  ORANGE:  "orange",
  GREEN:   "green",
  RED:     "red",
  DEFAULT: "default",
} as const;
export type AntdTagColor = typeof AntdTagColor[keyof typeof AntdTagColor];

export type HexColor = `#${string}`;
