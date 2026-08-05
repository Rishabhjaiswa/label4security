"use client";

import { useState } from "react";
import { deleteAuthPage } from "@/app/actions/pages";
import { Trash2 } from "lucide-react";

export default function DeletePageButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this authentication page?")) {
      setLoading(true);
      try {
        await deleteAuthPage(id);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors disabled:opacity-50"
      title="Delete Page"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
