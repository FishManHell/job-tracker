export const COLORS = {
  primary: "#6366f1", // indigo-500
  info:    "#3b82f6", // blue-500
  warning: "#f59e0b", // amber-500
  success: "#10b981", // emerald-500
  error:   "#ef4444", // red-500
  purple:  "#8b5cf6", // violet-500
  muted:   "#6b7280", // gray-500
  pink:    "#ec4899", // pink-500
  teal:    "#14b8a6", // teal-500
  sidebar: "#1a1d2e", // dark sidebar background
} as const;

export type AppColor = typeof COLORS[keyof typeof COLORS];
