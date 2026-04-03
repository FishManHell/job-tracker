"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
import type { CompanyFormValues } from "@/components/companies/CompanyModal.utils";

function normalizeWebsite(url: string | undefined): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export async function createCompany(
  values: CompanyFormValues,
): Promise<{ id: string; name: string } | { error: string }> {
  const session = await auth();
  const userId  = session!.user!.id!;
  const name    = values.name.trim();

  try {
    const duplicate = await prisma.company.findFirst({
      where: { userId, name: { equals: name, mode: "insensitive" } },
    });
    if (duplicate) return { error: "A company with this name already exists." };

    const company = await prisma.company.create({
      data: { userId, name, website: normalizeWebsite(values.website) },
    });
    revalidatePath(ROUTES.COMPANIES);
    return { id: company.id, name: company.name };
  } catch {
    return { error: "Failed to create company." };
  }
}

export async function updateCompany(id: string, values: CompanyFormValues): Promise<{ error: string } | undefined> {
  const session = await auth();
  const userId  = session!.user!.id!;

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

      // Keep denormalized companyName in sync on all linked applications
      if (nameChanged) {
        await tx.application.updateMany({
          where: { companyId: id, userId },
          data:  { companyName: newName },
        });
      }
    });

    revalidatePath(ROUTES.COMPANIES);
    revalidatePath(ROUTES.APPLICATIONS);
    revalidatePath(ROUTES.DASHBOARD);
  } catch (e: unknown) {
    if (e instanceof Error && e.message === "DUPLICATE")
      return { error: "A company with this name already exists." };
    return { error: "Failed to update company." };
  }
}

export async function deleteCompany(id: string): Promise<{ error: string } | undefined> {
  const session = await auth();
  const userId  = session!.user!.id!;

  try {
    await prisma.company.delete({ where: { id, userId } });
    revalidatePath(ROUTES.COMPANIES);
    revalidatePath(ROUTES.APPLICATIONS);
    revalidatePath(ROUTES.DASHBOARD);
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
