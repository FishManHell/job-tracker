import type { CompanyWithStats } from "@/lib/data/companies";

export interface CompanyFormValues {
  name:     string;
  website?: string;
}

export const ADD_DEFAULTS: CompanyFormValues = {
  name:    "",
  website: "",
};

export function toFormValues(company: CompanyWithStats): CompanyFormValues {
  return {
    name:    company.name,
    website: company.website ?? "",
  };
}
