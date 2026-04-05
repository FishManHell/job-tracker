import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/routes";

export function revalidateAppRelatedPages() {
  revalidatePath(ROUTES.DASHBOARD);
  revalidatePath(ROUTES.APPLICATIONS);
  revalidatePath(ROUTES.COMPANIES);
}
