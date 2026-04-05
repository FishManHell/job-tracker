"use client";

import { DefaultsForm }   from "./DefaultsForm";
import { DataExportCard } from "./DataExportCard";
import { DangerZoneCard } from "./DangerZoneCard";
import type { SettingsData } from "@/types/settings";

interface SettingsContentProps {
  data: SettingsData;
}

function SettingsContent({ data }: SettingsContentProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your preferences and account</p>
      </div>

      <div className="flex flex-col gap-5">
        <DefaultsForm   data={data} />
        <DataExportCard />
        <DangerZoneCard />
      </div>
    </div>
  );
}


export default SettingsContent