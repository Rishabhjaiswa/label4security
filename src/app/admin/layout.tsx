import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, FileText, LogOut, ArrowLeft } from "lucide-react";
import { AdminNavLinks } from "@/components/AdminNavLinks";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#060B12] text-white flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col fixed inset-y-0 z-10">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <img src="/images/logo.png" alt="label4security" className="h-8 w-auto" />
          <span className="text-sm font-bold tracking-tight text-white">Admin Portal</span>
        </div>

        <AdminNavLinks />

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center w-full px-4 py-2.5 text-xs font-medium text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-3 h-4 w-4 opacity-70" />
            Main Website
          </Link>
          <a
            href="/api/auth/signout"
            className="flex items-center w-full px-4 py-2.5 text-xs font-medium text-red-400 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4 opacity-70" />
            Sign out
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-slate-900/60 border-b border-slate-800 h-16 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
          <h1 className="text-sm font-semibold text-slate-300">label4security Management System</h1>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
            {session.user?.email}
          </span>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
