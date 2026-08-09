import { notFound } from "next/navigation";
import { getPageById } from "@/lib/store";
import PageForm from "@/components/PageForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPageById(id);
  if (!page) notFound();
  return <PageForm page={page} />;
}
