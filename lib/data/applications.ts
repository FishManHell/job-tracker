import { prisma } from "@/lib/prisma";
import type { ApplicationStatus } from "@/types/application";
import type { Application } from "@prisma/client";

// Date objects cannot be passed to Client Components as props —
// serialize them to strings at the Server Component level.
export type SerializedApplication = Omit<Application, "appliedAt" | "createdAt" | "updatedAt"> & {
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
};

export function serializeApplication(app: Application): SerializedApplication {
  return {
    ...app,
    appliedAt: app.appliedAt.toISOString(),
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
  };
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export interface ApplicationStats {
  total:     number;
  applied:   number;
  screening: number;
  interview: number;
  offer:     number;
  rejected:  number;
  withdrawn: number;
}

export async function getApplicationStats(userId: string): Promise<ApplicationStats> {
  const counts = await prisma.application.groupBy({
    by: ["status"],
    where: { userId },
    _count: { _all: true },
  });

  const map = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));

  const total = Object.values(map).reduce((a, b) => a + b, 0);

  return {
    total,
    applied:   map.APPLIED   ?? 0,
    screening: map.SCREENING ?? 0,
    interview: map.INTERVIEW ?? 0,
    offer:     map.OFFER     ?? 0,
    rejected:  map.REJECTED  ?? 0,
    withdrawn: map.WITHDRAWN ?? 0,
  };
}

// ─── Recent applications for Dashboard ───────────────────────────────────────

export async function getRecentApplications(
  userId: string,
  limit = 6,
): Promise<SerializedApplication[]> {
  const apps = await prisma.application.findMany({
    where:   { userId },
    orderBy: { appliedAt: "desc" },
    take:    limit,
  });

  return apps.map(serializeApplication);
}

// ─── Paginated list for Applications page ────────────────────────────────────

export interface GetApplicationsParams {
  status?: ApplicationStatus;
  search?: string;
  page?:   number;
  limit?:  number;
}

export interface PaginatedApplications {
  items: SerializedApplication[];
  total: number;
  page:  number;
  limit: number;
}

export async function getApplications(
  userId: string,
  params: GetApplicationsParams = {},
): Promise<PaginatedApplications> {
  const { status, search, page = 1, limit = 20 } = params;

  const where = {
    userId,
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { companyName: { contains: search, mode: "insensitive" as const } },
            { position:    { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [apps, total] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: { appliedAt: "desc" },
      skip:    (page - 1) * limit,
      take:    limit,
    }),
    prisma.application.count({ where }),
  ]);

  return { items: apps.map(serializeApplication), total, page, limit };
}
