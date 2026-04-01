"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";
import {ReactNode} from "react";

export default function AntdProvider({ children }: { children: ReactNode }) {
  const { isDark } = useResolvedTheme();

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: "#6366f1",
            borderRadius: 10,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
