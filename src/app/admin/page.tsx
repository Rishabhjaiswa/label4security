import Link from "next/link";
import { FileText, Plus, CheckCircle, Mail, ExternalLink } from "lucide-react";
import { getAllPages, countPages, countEnquiries } from "@/lib/store";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const totalPages = await countPages();
  const totalEnquiries = await countEnquiries();
  const pages = await getAllPages();
  const recentPages = pages.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1">Overview of your product authentication pages</p>
        </div>
        <Link
          href="/admin/pages/create"
          className="inline-flex items-center px-4 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-xl shadow-lg transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Page
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex items-center shadow-lg">
          <div className="p-4 bg-accent/10 rounded-xl">
            <FileText className="h-8 w-8 text-accent" />
          </div>
          <div className="ml-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pages</p>
            <p className="text-3xl font-bold text-white">{totalPages}</p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex items-center shadow-lg">
          <div className="p-4 bg-emerald-500/10 rounded-xl">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <div className="ml-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Brands</p>
            <p className="text-3xl font-bold text-white">
              {recentPages.filter(p => p.verificationStatus === 'Verified').length}
            </p>
          </div>
        </div>

        <Link 
          href="/admin/inquiries"
          className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex items-center shadow-lg hover:border-slate-700 transition-colors"
        >
          <div className="p-4 bg-amber-500/10 rounded-xl">
            <Mail className="h-8 w-8 text-amber-400" />
          </div>
          <div className="ml-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enquiries</p>
            <p className="text-3xl font-bold text-white">{totalEnquiries}</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Recently Created Pages</h3>
        </div>

        {recentPages.length === 0 ? (
          <div className="p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
              <FileText className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">No verification pages yet</h3>
            <p className="text-sm text-slate-400 mb-4">Get started by creating your first QR verification page.</p>
            <Link
              href="/admin/pages/create"
              className="inline-flex items-center px-4 py-2 bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors"
            >
              Create Page
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-950/60">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-900/50 divide-y divide-slate-800/60">
                {recentPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{page.productName}</span>
                        <span className="text-xs text-slate-400">ID: {page.productId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{page.companyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        page.verificationStatus === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {page.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {new Date(page.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/pages/${page.id}/edit`} className="text-accent hover:text-accent/80 mr-4">Edit</Link>
                      <Link href={`/verify/${page.uuid}`} target="_blank" className="text-slate-400 hover:text-white inline-flex items-center gap-1">
                        View <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
