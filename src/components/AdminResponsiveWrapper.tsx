"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { AdminNavLinks } from "./AdminNavLinks";
import { AdminSignOutButton } from "./AdminSignOutButton";

interface AdminResponsiveWrapperProps {
  children: React.ReactNode;
}

export function AdminResponsiveWrapper({ children }: AdminResponsiveWrapperProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060B12] text-white flex flex-col lg:flex-row font-sans">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-slate-900/90 border-r border-slate-800 fixed inset-y-0 z-20">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
          <img src="/images/logo.png" alt="Matrix Tags" className="h-8 w-auto" />
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
          <AdminSignOutButton />
        </div>
      </aside>

      {/* Mobile Top Header (hidden on desktop) */}
      <header className="lg:hidden bg-slate-900/90 border-b border-slate-800 h-16 flex items-center justify-between px-6 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Matrix Tags" className="h-8 w-auto" />
          <span className="text-xs font-bold tracking-tight text-white">Admin Portal</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Sidebar Slide-out Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="absolute inset-y-0 left-0 w-64 bg-slate-950 border-r border-slate-850 flex flex-col p-6 animate-in slide-in-from-left duration-250">
            <div className="flex items-center justify-between pb-6 border-b border-slate-850">
              <div className="flex items-center space-x-3">
                <img src="/images/logo.png" alt="Matrix Tags" className="h-8 w-auto" />
                <span className="text-xs font-bold tracking-tight text-white">Admin Portal</span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 mt-6" onClick={() => setIsMobileOpen(false)}>
              <AdminNavLinks />
            </div>

            <div className="pt-4 border-t border-slate-850 space-y-2">
              <Link
                href="/"
                className="flex items-center w-full px-4 py-2.5 text-xs font-medium text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-3 h-4 w-4 opacity-70" />
                Main Website
              </Link>
              <AdminSignOutButton />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-slate-900/60 border-b border-slate-800 h-16 items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
          <h1 className="text-sm font-semibold text-slate-300">Matrix Tags Management System</h1>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
            admin@matrixtags.com
          </span>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
