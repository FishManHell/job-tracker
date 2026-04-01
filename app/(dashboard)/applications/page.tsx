import { auth } from "@/lib/auth";
import { getApplications } from "@/lib/data/applications";
import { ApplicationStatus } from "@/types/application";
import ApplicationsTable from "@/components/applications/ApplicationsTable";
import AddApplicationButton from "@/components/applications/AddApplicationButton";

// searchParams in Next.js 16 is a Promise
interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const session = await auth();
  const userId  = session!.user!.id!;
  const params  = await searchParams;

  // Validate status — only accept known enum values
  const validStatuses = Object.values(ApplicationStatus) as string[];
  const status = params.status && validStatuses.includes(params.status)
    ? (params.status as typeof ApplicationStatus[keyof typeof ApplicationStatus])
    : undefined;

  const { items, total, page, limit } = await getApplications(userId, {
    status,
    search: params.search,
    page:   params.page ? Number(params.page) : 1,
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
          <p className="text-gray-500 text-sm mt-1">
            {total} total application{total !== 1 ? "s" : ""}
          </p>
        </div>
        <AddApplicationButton />
      </div>

      <ApplicationsTable
        applications={items}
        total={total}
        page={page}
        limit={limit}
        currentStatus={status}
        currentSearch={params.search}
      />
    </div>
  );
}
