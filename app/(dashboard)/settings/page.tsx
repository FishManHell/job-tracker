import { auth } from "@/lib/auth";
import { getUserSettings } from "@/lib/data/settings";
import SettingsContent from "@/components/settings/SettingsContent";

async function SettingsPage() {
  const session = await auth();
  const userId  = session!.user!.id!;
  const data    = await getUserSettings(userId);

  return <SettingsContent data={data} />;
}

export default SettingsPage;