"use client";

import { useState, useTransition } from "react";
import type { ActionState } from "@/types/auth";

type ServerAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;

export function useFormAction<T>(
  action: ServerAction,
  buildFormData: (values: T) => FormData,
) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (values: T) => {
    setError(null);
    startTransition(async () => {
      const result = await action(undefined, buildFormData(values));
      if (result?.error) setError(result.error);
    });
  };

  return { error, isPending, handleSubmit };
}
