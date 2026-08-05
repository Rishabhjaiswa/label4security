import prisma from "@/lib/prisma";
import PageForm from "@/components/PageForm";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const page = await prisma.authenticationPage.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!page) {
    notFound();
  }

  return <PageForm page={page} />;
}
