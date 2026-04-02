"use client";

import { Select } from "antd";
import { STATUS_CONFIG, STATUS_SELECT_OPTIONS } from "@/lib/status-config";
import type { ApplicationStatus } from "@/types/application";
import type { CSSProperties } from "react";
import { renderDotOption } from "@/components/common/select-helpers";

interface StatusSelectProps {
  value?:    ApplicationStatus | null;
  onChange?: (value: ApplicationStatus | undefined) => void;
  size?:     "large" | "middle" | "small";
  style?:    CSSProperties;
  placeholder?: string;
  allowClear?:  boolean;
}

function StatusSelect(props: StatusSelectProps) {
    const { value, onChange, size = "large", style, placeholder = "All statuses", allowClear } = props
    return (
        <Select
            value={value}
            onChange={(val) => onChange?.(val ?? undefined)}
            size={size}
            style={style}
            placeholder={placeholder}
            allowClear={allowClear}
            options={STATUS_SELECT_OPTIONS}
            optionRender={(option) => {
                const s = STATUS_CONFIG[option.data.value];
                return renderDotOption(s.dotColor, option.label);
            }}
        />
    );
}

export default StatusSelect;
