"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/types/auth";
import type { AddApplicationFormValues } from "@/types/application";

// Хелпер: отримати userId або кинути помилку — щоб не дублювати в кожній дії
async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function revalidateApplicationPages() {
  revalidatePath("/");
  revalidatePath("/applications");
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createApplication(
  values: AddApplicationFormValues,
): Promise<ActionState> {
  const userId = await requireUserId();

  await prisma.application.create({
    data: {
      userId,
      companyName: values.companyName,
      position:    values.position,
      status:      values.status,
      location:    values.location   ?? null,
      remote:      values.remote,
      currency:    values.currency,
      salaryMin:   values.salaryMin  ?? null,
      salaryMax:   values.salaryMax  ?? null,
      jobUrl:      values.jobUrl     ?? null,
      notes:       values.notes      ?? null,
    },
  });

  revalidateApplicationPages();
  return undefined;
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateApplication(
  id: string,
  values: Partial<AddApplicationFormValues>,
): Promise<ActionState> {
  const userId = await requireUserId();

  // Перевіряємо що заявка належить поточному юзеру
  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return { error: "Application not found" };
  }

  await prisma.application.update({
    where: { id },
    data:  values,
  });

  revalidateApplicationPages();
  return undefined;
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteApplication(id: string): Promise<ActionState> {
  const userId = await requireUserId();

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return { error: "Application not found" };
  }

  await prisma.application.delete({ where: { id } });

  revalidateApplicationPages();
  return undefined;
}
