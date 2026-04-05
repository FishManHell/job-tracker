import { prisma } from "@/lib/prisma";
import type { Company } from "@prisma/client";
import type { ApplicationStatus } from "@/types/application";

export type CompanyOption = { id: string; name: string };

export async function getCompaniesList(userId: string): Promise<CompanyOption[]> {
  return prisma.company.findMany({
    where:   { userId },
    select:  { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export interface CompanyWithStats extends Omit<Company, "createdAt" | "updatedAt"> {
  createdAt:        string;
  updatedAt:        string;
  applicationCount: number;
  statuses:         ApplicationStatus[];
}

export interface CompanyStats {
  total:           number;
  active:          number;
  withOffer:       number;
  avgApplications: number;
}

const ACTIVE_STATUSES: ApplicationStatus[] = ["APPLIED", "SCREENING", "INTERVIEW"];

export async function getCompanies(userId: string): Promise<CompanyWithStats[]> {
  const companies = await prisma.company.findMany({
    where:   { userId },
    include: { applications: { select: { status: true } } },
    orderBy: { name: "asc" },
  });

  return companies.map((c) => ({
    ...c,
    createdAt:        c.createdAt.toISOString(),
    updatedAt:        c.updatedAt.toISOString(),
    applicationCount: c.applications.length,
    statuses: [
      ...new Set(c.applications.map((a) => a.status as ApplicationStatus)),
    ],
  }));
}

export function computeCompanyStats(companies: CompanyWithStats[]): CompanyStats {
  const total     = companies.length;
  const active    = companies.filter((c) => c.statuses.some((s) => ACTIVE_STATUSES.includes(s))).length;
  const withOffer = companies.filter((c) => c.statuses.includes("OFFER")).length;
  const totalApps = companies.reduce((sum, c) => sum + c.applicationCount, 0);

  return {
    total,
    active,
    withOffer,
    avgApplications: total > 0 ? Math.round(totalApps / total) : 0,
  };
}
