"use server";

import { revalidatePath } from "next/cache";
import { signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-helpers";
import { ROUTES } from "@/lib/routes";
import type { ActionState } from "@/types/auth";
import type { DefaultsFormValues } from "@/types/settings";

export async function updateDefaults(values: DefaultsFormValues): Promise<ActionState> {
  const userId = await requireUserId();

  await prisma.userSettings.upsert({
    where:  { userId },
    create: { userId, ...values },
    update: { ...values },
  });

  revalidatePath(ROUTES.SETTINGS);
  return undefined;
}

export async function deleteAccount(): Promise<never> {
  const userId = await requireUserId();
  await prisma.user.delete({ where: { id: userId } });
  await signOut({ redirectTo: ROUTES.LOGIN });
  throw new Error("unreachable");
}
