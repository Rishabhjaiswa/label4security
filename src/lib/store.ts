import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DB_PATH = path.join(process.cwd(), 'data', 'pages.json');

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

function ensureDb(): AuthPage[] {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '[]', 'utf-8');
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as AuthPage[];
  } catch {
    return [];
  }
}

function save(pages: AuthPage[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(pages, null, 2), 'utf-8');
}

export function getAllPages(): AuthPage[] {
  return ensureDb().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPageById(id: string): AuthPage | null {
  return ensureDb().find((p) => p.id === id) ?? null;
}

export function getPageByUuid(uuid: string): AuthPage | null {
  return ensureDb().find((p) => p.uuid === uuid) ?? null;
}

export function createPage(data: Omit<AuthPage, 'id' | 'uuid' | 'createdAt' | 'updatedAt'>): AuthPage {
  const pages = ensureDb();
  const now = new Date().toISOString();
  const page: AuthPage = {
    ...data,
    id: randomUUID(),
    uuid: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  pages.push(page);
  save(pages);
  return page;
}

export function updatePage(id: string, data: Partial<Omit<AuthPage, 'id' | 'uuid' | 'createdAt'>>): AuthPage | null {
  const pages = ensureDb();
  const idx = pages.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  pages[idx] = { ...pages[idx], ...data, updatedAt: new Date().toISOString() };
  save(pages);
  return pages[idx];
}

export function deletePage(id: string): boolean {
  const pages = ensureDb();
  const filtered = pages.filter((p) => p.id !== id);
  if (filtered.length === pages.length) return false;
  save(filtered);
  return true;
}

export function countPages(): number {
  return ensureDb().length;
}
