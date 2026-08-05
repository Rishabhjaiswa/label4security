"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAuthPage(formData: FormData) {
  const companyName = formData.get("companyName") as string;
  const brandName = formData.get("brandName") as string;
  const productName = formData.get("productName") as string;
  const productId = formData.get("productId") as string;
  const description = formData.get("description") as string;
  const verificationStatus = formData.get("verificationStatus") as string;
  const logo = formData.get("logo") as string;
  const images = formData.get("images") as string;

  await prisma.authenticationPage.create({
    data: {
      companyName,
      brandName,
      productName,
      productId,
      description,
      verificationStatus,
      logo,
      images,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function updateAuthPage(id: string, formData: FormData) {
  const companyName = formData.get("companyName") as string;
  const brandName = formData.get("brandName") as string;
  const productName = formData.get("productName") as string;
  const productId = formData.get("productId") as string;
  const description = formData.get("description") as string;
  const verificationStatus = formData.get("verificationStatus") as string;
  const logo = formData.get("logo") as string;
  const images = formData.get("images") as string;

  await prisma.authenticationPage.update({
    where: { id },
    data: {
      companyName,
      brandName,
      productName,
      productId,
      description,
      verificationStatus,
      logo,
      images,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function deleteAuthPage(id: string) {
  await prisma.authenticationPage.delete({
    where: { id },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/pages");
}
