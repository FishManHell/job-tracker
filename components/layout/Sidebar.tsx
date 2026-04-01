"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { ROUTES } from "@/lib/routes";
import SidebarNav from "./SidebarNav";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {

  const onSignOut = () => signOut({ redirectTo: ROUTES.LOGIN })

  return (
    <aside className="w-60 min-h-screen flex flex-col bg-[#1a1d2e] text-white shrink-0">
      {/* Logo */}
      <Link href={ROUTES.DASHBOARD} className="flex items-center gap-3 px-5 py-6 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm">
          J
        </div>
        <span className="font-semibold text-base tracking-wide">JobTracker</span>
      </Link>

      {/* Navigation */}
      <SidebarNav />

      {/* Bottom actions */}
      <div className="px-4 py-4 border-t border-white/10 space-y-1">
        <ThemeToggle />

        <Button
          type="text"
          block
          danger
          icon={<LogoutOutlined />}
          onClick={onSignOut}
          className="flex! items-center! gap-3! px-3! py-2.5! rounded-lg! text-sm! font-medium! h-auto! justify-start!"
        >
          Logout
        </Button>

        <Link
          href={ROUTES.PROFILE}
          className="flex items-center gap-3 pt-3 mt-1 border-t border-white/10 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold shrink-0">
            DZ
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Denys Z.</p>
            <p className="text-xs text-gray-400">Pro Plan</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
