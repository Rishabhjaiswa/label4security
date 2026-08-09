import prisma from "./prisma";
import fs from "fs";
import path from "path";

export type AuthPage = {
  id: string;
  uuid: string;
  companyName: string;
  brandName: string;
  productName: string;
  productId: string;
  description: string;
  verificationStatus: string;
  logo: string;
  images: string;
  createdAt: string;
  updatedAt: string;
};

// Auto-migrate from JSON to Database on first start if database is empty
async function migrateJsonToDb() {
  try {
    const count = await prisma.authenticationPage.count();
    if (count > 0) return;

    const jsonPath = path.join(process.cwd(), "data", "pages.json");
    if (!fs.existsSync(jsonPath)) return;

    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const pages = JSON.parse(fileContent) as any[];

    if (pages.length === 0) return;

    console.log(`Auto-migrating ${pages.length} pages from JSON to SQLite database...`);
    
    for (const page of pages) {
      await prisma.authenticationPage.create({
        data: {
          id: page.id,
          uuid: page.uuid,
          companyName: page.companyName,
          brandName: page.brandName,
          productName: page.productName,
          productId: page.productId,
          description: page.description,
          verificationStatus: page.verificationStatus || "Verified",
          logo: page.logo,
          images: page.images,
          createdAt: new Date(page.createdAt),
          updatedAt: new Date(page.updatedAt),
        },
      });
    }
    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  }
}

// Trigger migration in background
migrateJsonToDb();

export async function getAllPages(): Promise<AuthPage[]> {
  const pages = await prisma.authenticationPage.findMany({
    orderBy: { createdAt: "desc" },
  });
  return pages.map((p) => ({
    id: p.id,
    uuid: p.uuid,
    companyName: p.companyName,
    brandName: p.brandName,
    productName: p.productName,
    productId: p.productId,
    description: p.description || "",
    verificationStatus: p.verificationStatus,
    logo: p.logo || "",
    images: p.images || "",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}

export async function getPageById(id: string): Promise<AuthPage | null> {
  const p = await prisma.authenticationPage.findUnique({
    where: { id },
  });
  if (!p) return null;
  return {
    id: p.id,
    uuid: p.uuid,
    companyName: p.companyName,
    brandName: p.brandName,
    productName: p.productName,
    productId: p.productId,
    description: p.description || "",
    verificationStatus: p.verificationStatus,
    logo: p.logo || "",
    images: p.images || "",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function getPageByUuid(uuid: string): Promise<AuthPage | null> {
  const p = await prisma.authenticationPage.findUnique({
    where: { uuid },
  });
  if (!p) return null;
  return {
    id: p.id,
    uuid: p.uuid,
    companyName: p.companyName,
    brandName: p.brandName,
    productName: p.productName,
    productId: p.productId,
    description: p.description || "",
    verificationStatus: p.verificationStatus,
    logo: p.logo || "",
    images: p.images || "",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function createPage(data: Omit<AuthPage, "id" | "uuid" | "createdAt" | "updatedAt">): Promise<AuthPage> {
  const p = await prisma.authenticationPage.create({
    data: {
      companyName: data.companyName,
      brandName: data.brandName,
      productName: data.productName,
      productId: data.productId,
      description: data.description,
      verificationStatus: data.verificationStatus,
      logo: data.logo,
      images: data.images,
    },
  });
  return {
    id: p.id,
    uuid: p.uuid,
    companyName: p.companyName,
    brandName: p.brandName,
    productName: p.productName,
    productId: p.productId,
    description: p.description || "",
    verificationStatus: p.verificationStatus,
    logo: p.logo || "",
    images: p.images || "",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function updatePage(
  id: string,
  data: Partial<Omit<AuthPage, "id" | "uuid" | "createdAt">>
): Promise<AuthPage | null> {
  const p = await prisma.authenticationPage.update({
    where: { id },
    data: {
      companyName: data.companyName,
      brandName: data.brandName,
      productName: data.productName,
      productId: data.productId,
      description: data.description,
      verificationStatus: data.verificationStatus,
      logo: data.logo,
      images: data.images,
    },
  });
  return {
    id: p.id,
    uuid: p.uuid,
    companyName: p.companyName,
    brandName: p.brandName,
    productName: p.productName,
    productId: p.productId,
    description: p.description || "",
    verificationStatus: p.verificationStatus,
    logo: p.logo || "",
    images: p.images || "",
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function deletePage(id: string): Promise<boolean> {
  try {
    await prisma.authenticationPage.delete({
      where: { id },
    });
    return true;
  } catch {
    return false;
  }
}

export async function countPages(): Promise<number> {
  return await prisma.authenticationPage.count();
}

export async function getAllEnquiries() {
  return await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function countEnquiries(): Promise<number> {
  return await prisma.enquiry.count();
}
