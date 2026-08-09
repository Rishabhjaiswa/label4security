"use client";

import { logoutAdmin } from "@/app/actions/pages";
import { LogOut } from "lucide-react";

export function AdminSignOutButton() {
  const handleSignOut = async () => {
    try {
      await logoutAdmin();
    } catch (err) {
      console.error("Sign out action failed", err);
    }
    // Hard reload to clean state and verify redirect
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center w-full px-4 py-2.5 text-xs font-medium text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-left"
    >
      <LogOut className="mr-3 h-4 w-4 opacity-70" />
      Sign out
    </button>
  );
}
