import type { RuleObject } from "antd/es/form";

export const urlValidator: RuleObject = {
  validator: (_, value: string | undefined) => {
    if (!value?.trim()) return Promise.resolve();
    try {
      const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
      new URL(url);
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error("Enter a valid website (e.g. company.com)"));
    }
  },
};
