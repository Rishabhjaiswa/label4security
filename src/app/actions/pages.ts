"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createPage, updatePage, deletePage } from "@/lib/store";
import prisma from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { sendEmail } from "@/lib/mail";

import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rateLimit";

async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function createAuthPage(formData: FormData) {
  try {
    await verifySession();
    await createPage({
      companyName:        (formData.get("companyName") as string) || "",
      brandName:          (formData.get("brandName") as string) || "",
      productName:        (formData.get("productName") as string) || "",
      productId:          (formData.get("productId") as string) || "",
      description:        (formData.get("description") as string) || "",
      verificationStatus: (formData.get("verificationStatus") as string) || "Pending",
      logo:               (formData.get("logo") as string) || "",
      images:             (formData.get("images") as string) || "",
    });

    revalidatePath("/admin");
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to create authentication page:", err);
    return { 
      success: false, 
      error: err.message === "Unauthorized" ? "Unauthorized access" : "Database operation failed. Please try again." 
    };
  }
}

export async function updateAuthPage(id: string, formData: FormData) {
  try {
    await verifySession();
    await updatePage(id, {
      companyName:        (formData.get("companyName") as string) || "",
      brandName:          (formData.get("brandName") as string) || "",
      productName:        (formData.get("productName") as string) || "",
      productId:          (formData.get("productId") as string) || "",
      description:        (formData.get("description") as string) || "",
      verificationStatus: (formData.get("verificationStatus") as string) || "Pending",
      logo:               (formData.get("logo") as string) || "",
      images:             (formData.get("images") as string) || "",
    });

    revalidatePath("/admin");
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to update authentication page:", err);
    return { 
      success: false, 
      error: err.message === "Unauthorized" ? "Unauthorized access" : "Database operation failed. Please try again." 
    };
  }
}

export async function deleteAuthPage(id: string) {
  try {
    await verifySession();
    await deletePage(id);
    revalidatePath("/admin");
    revalidatePath("/admin/pages");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete authentication page:", err);
    return { 
      success: false, 
      error: err.message === "Unauthorized" ? "Unauthorized access" : "Database operation failed. Please try again." 
    };
  }
}

export async function loginAdmin(email: string, password: string) {
  try {
    // Check rate limit: 5 attempts per minute per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip, 5, 60 * 1000)) {
      return { success: false, error: "Too many login attempts. Please try again in a minute." };
    }

    // Ensure the default admin user configured in .env is always present in the DB
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@matrixtags.com";
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Matrix@2025";

    await prisma.user.upsert({
      where: { email: defaultEmail },
      update: {},
      create: {
        email: defaultEmail,
        password: hashPassword(defaultPassword),
        name: "Admin",
      },
    });

    // Verify credentials against User model
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && verifyPassword(password, user.password)) {
      const cookieStore = await cookies();
      cookieStore.set("admin-session", "true", {
        httpOnly: true,
        secure: false, // Allow HTTP login on local IP networks
        sameSite: "lax",
        maxAge: 86400, // 24 hours
        path: "/",
      });
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("Login verification failed:", err);
    return { success: false };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  return { success: true };
}

export async function deleteEnquiry(id: string) {
  try {
    await verifySession();
    await prisma.enquiry.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (err: any) {
    console.error("Failed to delete enquiry:", err);
    return { 
      success: false, 
      error: err.message === "Unauthorized" ? "Unauthorized access" : "Database operation failed." 
    };
  }
}

export async function submitEnquiry(data: {
  fullName: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  category?: string;
  message?: string;
}) {
  try {
    await prisma.enquiry.create({
      data: {
        fullName: data.fullName,
        companyName: data.companyName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        category: data.category || null,
        message: data.message || null,
      },
    });

    // Send email alert to admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "labelsecurity@gmail.com";
    const subject = `📩 New B2B Inquiry: ${data.fullName} (${data.companyName})`;
    const content = `You have received a new business lead inquiry on label4security.

Client Name: ${data.fullName}
Company: ${data.companyName}
Phone Number: ${data.phoneNumber}
Email Address: ${data.email}
Product Category Interest: ${data.category || "General / Custom"}

Client Requirement / Message:
${data.message || "No additional message provided."}

--
Matrix Tags Authentication Portal System Alert`;

    // Trigger asynchronously so it does not block the client UI response
    sendEmail({ to: adminEmail, subject, text: content }).catch(err => {
      console.error("Async email notification error:", err);
    });

    return { success: true };
  } catch (err) {
    console.error("Enquiry submission failed:", err);
    return { success: false };
  }
}
