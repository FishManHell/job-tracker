"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-helpers";
import type { ActionState } from "@/types/auth";
import { ROUTES } from "@/lib/routes";

export async function updateProfile(name: string): Promise<ActionState> {
  const userId = await requireUserId();

  await prisma.user.update({
    where: { id: userId },
    data:  { name },
  });

  revalidatePath(ROUTES.PROFILE);
  return undefined;
}

export async function changePassword(
  currentPassword: string,
  newPassword:     string,
): Promise<ActionState> {
  const userId = await requireUserId();

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user?.password) return { error: "No password set for this account." };

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return { error: "Current password is incorrect." };

  const hashed = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data:  { password: hashed },
  });

  revalidatePath(ROUTES.PROFILE);
  return undefined;
}
