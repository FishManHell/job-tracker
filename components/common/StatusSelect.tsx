"use client";

import { Select } from "antd";
import { STATUS_OPTIONS } from "@/lib/status-config";
import type { ApplicationStatus } from "@/types/application";
import {CSSProperties} from "react";

interface StatusSelectProps {
  value?:    ApplicationStatus | null;
  onChange?: (value: ApplicationStatus | undefined) => void;
  size?:     "large" | "middle" | "small";
  style?:    CSSProperties;
  placeholder?: string;
  allowClear?:  boolean;
}

export default function StatusSelect(props: StatusSelectProps) {
    const { value, onChange, size = "large", style, placeholder = "All statuses", allowClear } = props
    return (
        <Select
            value={value}
            onChange={(val) => onChange?.(val ?? undefined)}
            size={size}
            style={style}
            placeholder={placeholder}
            allowClear={allowClear}
            options={STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            optionRender={(option) => {
                const s = STATUS_OPTIONS.find((o) => o.value === option.value);
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s?.dotColor }} />
                        {option.label}
                    </div>
                );

            }}
        />
    );
}
