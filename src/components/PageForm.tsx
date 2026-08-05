"use client";

import { useState } from "react";
import { createAuthPage, updateAuthPage } from "@/app/actions/pages";
import { AuthenticationPage } from "@prisma/client";
import Link from "next/link";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function PageForm({ page }: { page?: AuthenticationPage }) {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(page?.logo || "");

  // Base64 converter for simple logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        if (logoPreview) formData.set("logo", logoPreview);
        
        try {
          if (page) {
            await updateAuthPage(page.id, formData);
          } else {
            await createAuthPage(formData);
          }
        } finally {
          setLoading(false);
        }
      }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin/pages" className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {page ? "Edit Authentication Page" : "Create Authentication Page"}
            </h1>
            <p className="text-slate-400 mt-1">Fill in the details for the QR verification page</p>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl shadow-sm transition-colors disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Page"}
        </button>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 space-y-8 text-white shadow-xl">
        {/* Company & Brand Section */}
        <div>
          <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 mb-5">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                defaultValue={page?.companyName}
                required
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="e.g. Acme Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Brand Name</label>
              <input
                type="text"
                name="brandName"
                defaultValue={page?.brandName}
                required
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="e.g. Acme Premium"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Company Logo (Optional)</label>
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  {logoPreview ? (
                    <img className="h-16 w-16 object-cover rounded-xl border border-slate-700" src={logoPreview} alt="Logo preview" />
                  ) : (
                    <div className="h-16 w-16 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center bg-slate-800">
                      <ImageIcon className="h-6 w-6 text-slate-500" />
                    </div>
                  )}
                </div>
                <label className="block">
                  <span className="sr-only">Choose photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30 transition-colors cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div>
          <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 mb-5">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                defaultValue={page?.productName}
                required
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="e.g. Security Holographic Label"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Product ID / Serial Number</label>
              <input
                type="text"
                name="productId"
                defaultValue={page?.productId}
                required
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="e.g. SN-123456789"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Description / Additional Notes</label>
              <textarea
                name="description"
                defaultValue={page?.description || ""}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                placeholder="Enter product description, warranty details, or security message..."
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Verification Status</label>
              <select
                name="verificationStatus"
                defaultValue={page?.verificationStatus || "Verified"}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              >
                <option value="Verified">Verified Authentic</option>
                <option value="Pending">Pending Verification</option>
                <option value="Warning">Counterfeit Warning</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
