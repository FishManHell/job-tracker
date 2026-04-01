"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function useResolvedTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    isDark: mounted && resolvedTheme === "dark",
    setTheme,
  };
}
