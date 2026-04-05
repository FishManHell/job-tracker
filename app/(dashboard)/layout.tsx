import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import DashboardLayout from "@/components/layout/DashboardLayout";

async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  const name    = session?.user?.name  ?? "";
  const email   = session?.user?.email ?? "";

  return (
    <DashboardLayout name={name} email={email}>
      {children}
    </DashboardLayout>
  );
}

export default Layout