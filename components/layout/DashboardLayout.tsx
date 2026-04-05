"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { COLORS } from "@/lib/colors";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  name:     string;
  email:    string;
}

function DashboardLayout({ children, name, email }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar name={name} email={email} />
      </div>

      {/* Mobile drawer */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        styles={{
          wrapper: { width: 240 },
          body:    { padding: 0, backgroundColor: COLORS.sidebar, height: "100%" },
          header:  { display: "none" },
        }}
      >
        <Sidebar name={name} email={email} />
      </Drawer>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#1a1d2e] shrink-0">
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white", fontSize: 18 }} />}
            onClick={() => setOpen(true)}
          />
          <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm text-white">
              J
            </div>
            <span className="text-white font-semibold text-sm">JobTracker</span>
          </Link>
        </div>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
