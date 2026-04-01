"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Tooltip } from "antd";
import { navItems } from "@/lib/nav-items";
import { ROUTES } from "@/lib/routes";
import { useResolvedTheme } from "@/hooks/use-resolved-theme";

export default function Sidebar() {
  const pathname = usePathname();
  const { isDark, setTheme } = useResolvedTheme();

  return (
    <aside className="w-60 min-h-screen flex flex-col bg-[#1a1d2e] text-white shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-sm">
          J
        </div>
        <span className="font-semibold text-base tracking-wide">JobTracker</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-4 py-4 border-t border-white/10 space-y-1">
        <Tooltip title={isDark ? "Switch to Light" : "Switch to Dark"} placement="right">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {isDark ? (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </Tooltip>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Logout
        </button>

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
