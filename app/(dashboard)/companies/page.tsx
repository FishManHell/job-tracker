import { auth } from "@/lib/auth";
import { getCompanies, computeCompanyStats } from "@/lib/data/companies";
import { COMPANY_STAT_CARDS } from "@/lib/company-stats";
import StatsCard from "@/components/dashboard/StatsCard";
import CompaniesGrid from "@/components/companies/CompaniesGrid";
import AddCompanyButton from "@/components/companies/AddCompanyButton";

async function CompaniesPage() {
  const session   = await auth();
  const userId    = session!.user!.id!;
  const companies = await getCompanies(userId);
  const stats     = computeCompanyStats(companies);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6 xl:mb-8">
        <div>
          <h1 className="text-lg sm:text-xl xl:text-2xl font-bold">Companies</h1>
          <p className="text-gray-500 text-sm mt-1">
            {stats.total} total company{stats.total !== 1 ? "ies" : "y"}
          </p>
        </div>
        <AddCompanyButton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {COMPANY_STAT_CARDS.map((c) => (
          <StatsCard
            key={c.label}
            label={c.label}
            value={c.getValue(stats)}
            sub={c.getSub(stats)}
            borderColor={c.borderColor}
            subColor={c.subColor}
          />
        ))}
      </div>

      <CompaniesGrid companies={companies} />
    </div>
  );
}

export default CompaniesPage