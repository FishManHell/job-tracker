import type { CompanyWithStats }  from "@/lib/data/companies";
import type { CompanyFormValues } from "@/types/company";

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
