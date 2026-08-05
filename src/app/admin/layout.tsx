"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, LogOut, ArrowLeft } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Verification Pages", href: "/admin/pages", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#060B12] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <img src="/images/logo.png" alt="label4security" className="h-8 w-auto" />
          <span className="text-sm font-bold tracking-tight text-white">Admin Portal</span>
        </div>

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

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center w-full px-4 py-2.5 text-xs font-medium text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-3 h-4 w-4 opacity-70" />
            Main Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center w-full px-4 py-2.5 text-xs font-medium text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4 opacity-70" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-slate-900/60 border-b border-slate-800 h-16 flex items-center px-8 sticky top-0 z-10 backdrop-blur-md">
          <h1 className="text-sm font-semibold text-slate-300">label4security Management System</h1>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
