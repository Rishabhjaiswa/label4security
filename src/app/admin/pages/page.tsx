import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Search, ExternalLink } from "lucide-react";
import DeletePageButton from "@/components/DeletePageButton";

export const dynamic = 'force-dynamic';

export default async function PagesList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q || "";

  const pages = await prisma.authenticationPage.findMany({
    where: {
      OR: [
        { productName: { contains: query, mode: "insensitive" } },
        { companyName: { contains: query, mode: "insensitive" } },
        { productId: { contains: query, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      uuid: true,
      companyName: true,
      brandName: true,
      productName: true,
      productId: true,
      verificationStatus: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Verification Pages</h1>
          <p className="text-slate-400 mt-1">Manage all product authentication pages</p>
        </div>
        <Link
          href="/admin/pages/create"
          className="inline-flex items-center px-4 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-xl shadow-lg transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Page
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center shadow-lg">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <form>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by product, company, or ID..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent sm:text-sm transition-colors"
            />
          </form>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950/60">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Product Info</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Company / Brand</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Created</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900/50 divide-y divide-slate-800/60">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {page.productName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-white">{page.productName}</div>
                        <div className="text-xs text-slate-400 mt-0.5">ID: {page.productId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-200">{page.companyName}</div>
                    <div className="text-xs text-slate-400">{page.brandName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      page.verificationStatus === 'Verified' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {page.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link href={`/verify/${page.uuid}`} target="_blank" className="text-slate-400 hover:text-white transition-colors" title="View Public QR Page">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <Link href={`/admin/pages/${page.id}/edit`} className="text-accent hover:text-accent/80 bg-accent/10 hover:bg-accent/20 px-3 py-1 rounded-md transition-colors">
                        Edit
                      </Link>
                      <DeletePageButton id={page.id} />
                    </div>
                  </td>
                </tr>
              ))}
              
              {pages.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No authentication pages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
