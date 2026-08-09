import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminResponsiveWrapper } from "@/components/AdminResponsiveWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (!session) {
    redirect("/login");
  }

  return (
    <AdminResponsiveWrapper>
      {children}
    </AdminResponsiveWrapper>
  );
}
