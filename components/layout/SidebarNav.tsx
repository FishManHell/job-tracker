"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav-items";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
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
  );
}
