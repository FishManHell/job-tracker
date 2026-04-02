import type { ReactNode } from "react";
import type { ColumnType } from "antd/es/table";

export function createCol<T>() {
  return function col<K extends keyof T>(
    config: { dataIndex: K; render?: (value: T[K], record: T) => ReactNode }
      & Omit<ColumnType<T>, "render" | "dataIndex">,
  ): ColumnType<T> {
    return config as ColumnType<T>;
  };
}
