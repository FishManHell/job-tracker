"use client";

import { Button, Tooltip } from "antd";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import { SunIcon, MoonIcon } from "./ThemeToggle.icons";

function ThemeToggle() {
  const { isDark, setTheme } = useResolvedTheme();

  return (
    <Tooltip title={isDark ? "Switch to Light" : "Switch to Dark"} placement="right">
      <Button
        type="text"
        block
        onClick={() => setTheme(isDark ? "light" : "dark")}
        icon={isDark ? <SunIcon /> : <MoonIcon />}
        className="flex! items-center! gap-3! px-3! py-2.5! rounded-lg! text-sm! font-medium! text-gray-400! hover:text-white! hover:bg-white/5! h-auto! justify-start!"
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </Button>
    </Tooltip>
  );
}

export default ThemeToggle;
