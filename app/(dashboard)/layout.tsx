import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const name    = session?.user?.name  ?? "";
  const email   = session?.user?.email ?? "";

  return (
    <div className="flex h-full">
      <Sidebar name={name} email={email} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
