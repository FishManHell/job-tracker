import { prisma }  from "@/lib/prisma";
import { Currency } from "@/types/common";
import type { SettingsData } from "@/types/settings";

const DEFAULT_SETTINGS: SettingsData = {
  defaultCurrency: Currency.USD,
};

export async function getUserSettings(userId: string): Promise<SettingsData> {
  const row = await prisma.userSettings.findUnique({ where: { userId } });
  if (!row) return DEFAULT_SETTINGS;

  return {
    defaultCurrency: row.defaultCurrency as Currency,
  };
}
