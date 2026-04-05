import type { SerializedApplication } from "@/types/application";
import { AddApplicationFormValues, ApplicationStatus } from "@/types/application";
import { Currency } from "@/types/common";

export const ADD_DEFAULTS: Partial<AddApplicationFormValues> = {
  status:   ApplicationStatus.APPLIED,
  currency: Currency.USD,
  remote:   false,
};


export function toFormValues(app: SerializedApplication): AddApplicationFormValues {
  return {
    companyName: app.companyName,
    position:    app.position,
    status:      app.status,
    location:    app.location  ?? undefined,
    remote:      app.remote,
    currency:    app.currency,
    salaryMin:   app.salaryMin ?? undefined,
    salaryMax:   app.salaryMax ?? undefined,
    jobUrl:      app.jobUrl    ?? undefined,
    notes:       app.notes     ?? undefined,
  };
}
