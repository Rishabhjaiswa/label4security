"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText } from "lucide-react";

export function AdminNavLinks() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Verification Pages", href: "/admin/pages", icon: FileText },
  ];

  return (
    <nav className="flex-1 px-4 space-y-1 mt-6">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              isActive
                ? "bg-accent text-white font-semibold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-white" : "text-slate-500"}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
