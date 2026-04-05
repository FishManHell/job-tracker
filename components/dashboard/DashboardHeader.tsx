"use client";

import AddApplicationButton from "@/components/applications/AddApplicationButton";
import { getGreeting } from "./DashboardHeader.utils";
import type { CompanyOption } from "@/lib/data/companies";
import type { Currency } from "@/types/common";

interface DashboardHeaderProps {
  name:             string;
  companies:        CompanyOption[];
  defaultCurrency?: Currency;
}

function DashboardHeader({ name, companies, defaultCurrency }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 xl:mb-8">
      <h1 className="text-lg sm:text-xl xl:text-2xl font-bold">{getGreeting()}, {name} 👋</h1>
      <AddApplicationButton companies={companies} defaultCurrency={defaultCurrency} />
    </div>
  );
}

export default DashboardHeader;
