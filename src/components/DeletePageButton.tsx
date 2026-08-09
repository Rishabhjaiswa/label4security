"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthPage } from "@/app/actions/pages";
import { Trash2 } from "lucide-react";

export default function DeletePageButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this authentication page?")) {
      setLoading(true);
      try {
        const res = await deleteAuthPage(id);
        if (res?.success) {
          router.refresh();
        }
      } catch (err) {
        console.error("Delete failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-750 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors disabled:opacity-50 border border-red-500/10"
      title="Delete Page"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
