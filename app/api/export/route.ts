import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

  const userId = session.user.id;

  const [applications, interviews, companies] = await Promise.all([
    prisma.application.findMany({
      where:   { userId },
      orderBy: { appliedAt: "desc" },
    }),
    prisma.interview.findMany({
      where:   { application: { userId } },
      orderBy: { scheduledAt: "desc" },
    }),
    prisma.company.findMany({
      where:   { userId },
      orderBy: { name: "asc" },
      select:  { id: true, name: true, website: true, createdAt: true },
    }),
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    applications,
    interviews,
    companies,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type":        "application/json",
      "Content-Disposition": 'attachment; filename="job-tracker-export.json"',
    },
  });
}
