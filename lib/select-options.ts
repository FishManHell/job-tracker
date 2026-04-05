import { Currency } from "@/types/common";

export const CURRENCY_OPTIONS = Object.values(Currency).map((c) => ({ value: c, label: c }));
