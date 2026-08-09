import { getAllEnquiries } from "@/lib/store";
import { Mail, Phone, Calendar, User, Building2, Tag, FileText } from "lucide-react";
import DeleteEnquiryButton from "@/components/DeleteEnquiryButton";

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getAllEnquiries();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Client Inquiries</h1>
        <p className="text-slate-400 mt-1">Manage and respond to callback requests and product enquiries</p>
      </div>

      {/* Grid of Inquiries */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-16 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
              <Mail className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">No enquiries yet</h3>
            <p className="text-sm text-slate-400">
              When clients request a callback or send an enquiry on the website, they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {inquiries.map((enquiry) => (
              <div 
                key={enquiry.id} 
                className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all duration-200 shadow-lg relative overflow-hidden group"
              >
                {/* Visual Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/40 group-hover:bg-accent transition-colors" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  {/* Client Info */}
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-accent" />
                        {enquiry.fullName}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        <Building2 className="w-3.5 h-3.5 opacity-70" />
                        {enquiry.companyName}
                      </span>
                      {enquiry.category && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                          <Tag className="w-3.5 h-3.5" />
                          {enquiry.category}
                        </span>
                      )}
                    </div>

                    {/* Contact Details */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 font-medium">
                      <a href={`tel:${enquiry.phoneNumber}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Phone className="w-4 h-4 text-slate-500" />
                        {enquiry.phoneNumber}
                      </a>
                      <a href={`mailto:${enquiry.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Mail className="w-4 h-4 text-slate-500" />
                        {enquiry.email}
                      </a>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(enquiry.createdAt).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>

                    {/* Message */}
                    {enquiry.message && (
                      <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl mt-2">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          Client Message / Requirement
                        </h4>
                        <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">
                          {enquiry.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-start flex-shrink-0">
                    <DeleteEnquiryButton id={enquiry.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
