import { auth } from "@/lib/auth";
import { getAnalyticsData } from "@/lib/data/analytics";
import AnalyticsContent from "@/components/analytics/AnalyticsContent";

async function AnalyticsPage() {
  const session = await auth();
  const userId  = session!.user!.id!;
  const data    = await getAnalyticsData(userId);

  return <AnalyticsContent data={data} />;
}

export default AnalyticsPage;