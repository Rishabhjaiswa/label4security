"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEnquiry } from "@/app/actions/pages";
import { Trash2 } from "lucide-react";

export default function DeleteEnquiryButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to permanently delete this client inquiry? This will delete all client PII for this inquiry.")) {
      setLoading(true);
      try {
        const res = await deleteEnquiry(id);
        if (res?.success) {
          router.refresh();
        }
      } catch (err) {
        console.error("Failed to delete inquiry", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-red-400 hover:text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/10 disabled:opacity-50"
      title="Delete Client PII / Inquiry"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
