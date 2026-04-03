"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/types/auth";
import type { AddApplicationFormValues } from "@/types/application";
import { ROUTES } from "@/lib/routes";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

function revalidateApplicationPages() {
  revalidatePath(ROUTES.DASHBOARD);
  revalidatePath(ROUTES.APPLICATIONS);
  revalidatePath(ROUTES.COMPANIES);
}

// Find existing company by name (case-insensitive) or create a new one
async function findOrCreateCompany(
  userId: string,
  name: string,
  tx: Omit<typeof prisma, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = prisma,
) {
  const normalized = name.trim();
  const existing = await tx.company.findFirst({
    where: { userId, name: { equals: normalized, mode: "insensitive" } },
  });
  if (existing) return existing;
  return tx.company.create({ data: { userId, name: normalized } });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createApplication(
  values: AddApplicationFormValues,
): Promise<ActionState> {
  const userId = await requireUserId();

  await prisma.$transaction(async (tx) => {
    const company = await findOrCreateCompany(userId, values.companyName, tx);

    await tx.application.create({
      data: {
        userId,
        companyId:   company.id,
        companyName: company.name,
        position:    values.position,
        status:      values.status,
        location:    values.location?.trim()  || null,
        remote:      values.remote,
        currency:    values.currency,
        salaryMin:   values.salaryMin ?? null,
        salaryMax:   values.salaryMax ?? null,
        jobUrl:      values.jobUrl?.trim()    || null,
        notes:       values.notes?.trim()     || null,
      },
    });
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

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return { error: "Application not found" };
  }

  // If company name changed — findOrCreate the new company
  let companyId   = existing.companyId;
  let companyName = existing.companyName;
  if (values.companyName && values.companyName.trim() !== existing.companyName) {
    const company = await findOrCreateCompany(userId, values.companyName);
    companyId   = company.id;
    companyName = company.name;
  }

  await prisma.application.update({
    where: { id },
    data: {
      companyId,
      companyName,
      position:  values.position  ?? existing.position,
      status:    values.status    ?? existing.status,
      location:  values.location?.trim()  || null,
      remote:    values.remote    ?? existing.remote,
      currency:  values.currency  ?? existing.currency,
      salaryMin: values.salaryMin ?? null,
      salaryMax: values.salaryMax ?? null,
      jobUrl:    values.jobUrl?.trim()    || null,
      notes:     values.notes?.trim()     || null,
    },
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
