export const Currency = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  UAH: "UAH",
  CAD: "CAD",
  AUD: "AUD",
} as const;
export type Currency = typeof Currency[keyof typeof Currency];

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
