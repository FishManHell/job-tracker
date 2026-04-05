"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth-helpers";
import { revalidateAppRelatedPages } from "@/lib/revalidate";
import { ROUTES } from "@/lib/routes";
import type { ActionState } from "@/types/auth";
import type { CompanyFormValues } from "@/types/company";

function normalizeWebsite(url: string | undefined): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function createCompany(values: CompanyFormValues): Promise<ActionState> {
  const userId = await requireUserId();
  const name   = values.name.trim();

  try {
    const duplicate = await prisma.company.findFirst({
      where: { userId, name: { equals: name, mode: "insensitive" } },
    });
    if (duplicate) return { error: "A company with this name already exists." };

    await prisma.company.create({
      data: { userId, name, website: normalizeWebsite(values.website) },
    });
    revalidatePath(ROUTES.COMPANIES);
    return undefined;
  } catch {
    return { error: "Failed to create company." };
  }
}

export async function updateCompany(id: string, values: CompanyFormValues): Promise<ActionState> {
  const userId = await requireUserId();

  try {
    const newName = values.name.trim();

    await prisma.$transaction(async (tx) => {
      const existing = await tx.company.findUnique({ where: { id, userId } });
      if (!existing) throw new Error("Not found");

      const nameChanged = newName.toLowerCase() !== existing.name.toLowerCase();

      if (nameChanged) {
        const conflict = await tx.company.findFirst({
          where: { userId, name: { equals: newName, mode: "insensitive" }, NOT: { id } },
        });
        if (conflict) throw new Error("DUPLICATE");
      }

      await tx.company.update({
        where: { id, userId },
        data: {
          name:    newName,
          website: normalizeWebsite(values.website),
        },
      });

      if (nameChanged) {
        await tx.application.updateMany({
          where: { companyId: id, userId },
          data:  { companyName: newName },
        });
      }
    });

    revalidateAppRelatedPages();
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "DUPLICATE")
      return { error: "A company with this name already exists." };
    return { error: "Failed to update company." };
  }
}

export async function deleteCompany(id: string): Promise<ActionState> {
  const userId = await requireUserId();

  try {
    await prisma.company.delete({ where: { id, userId } });
    revalidateAppRelatedPages();
  } catch (e: unknown) {
    const isRestrictError =
      e instanceof Error && "code" in e && (e as { code: string }).code === "P2003";
    return {
      error: isRestrictError
        ? "Cannot delete a company that has linked applications."
        : "Failed to delete company.",
    };
  }
}
