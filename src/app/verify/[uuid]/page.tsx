import { notFound } from "next/navigation";
import { CheckCircle, AlertTriangle, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";
import { getPageByUuid } from "@/lib/store";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

export const dynamic = 'force-dynamic';

export default async function VerifyPage({ params }: { params: Promise<{ uuid: string }> }) {
  const resolvedParams = await params;
  const { uuid } = resolvedParams;

  // Retrieve user headers (IP and User-Agent)
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "127.0.0.1";

  const page = await getPageByUuid(uuid);

  if (!page) {
    // Send high-priority counterfeit warning email to admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "labelsecurity@gmail.com";
    const subject = `🚨 SECURITY ALERT: Counterfeit Label Scanned!`;
    const content = `A scan was detected using an invalid verification ID. This could indicate a counterfeit QR sticker attempt on the market.

Scanned ID (UUID): ${uuid}
Client IP Address: ${ip}
Browser User Agent: ${userAgent}
Scan Time: ${new Date().toLocaleString()}

--
Matrix Tags Security System Alert`;

    sendEmail({ to: adminEmail, subject, text: content }).catch(err => {
      console.error("Async counterfeit email warning error:", err);
    });

    notFound();
  }

  // Create scan log in the database
  try {
    await prisma.scanLog.create({
      data: {
        pageId: page.id,
        ipAddress: ip,
        userAgent: userAgent,
      }
    });
  } catch (logErr) {
    console.error("Failed to create scan log entry:", logErr);
  }

  // Send warning email if status is unverified or failed
  if (page.verificationStatus === "Unverified" || page.verificationStatus === "Failed") {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "labelsecurity@gmail.com";
    const subject = `⚠️ WARNING: Unverified Brand Page Scanned!`;
    const content = `A scan has occurred for a page flagged as "Unverified" or "Suspicious" in your portal.

Brand: ${page.brandName}
Product Name: ${page.productName}
Product ID: ${page.productId}
Manufacturer: ${page.companyName}
Client IP: ${ip}
User Agent: ${userAgent}
Time: ${new Date().toLocaleString()}

--
Matrix Tags Security System Alert`;

    sendEmail({ to: adminEmail, subject, text: content }).catch(err => {
      console.error("Async unverified scan email warning error:", err);
    });
  }

  const isVerified = page.verificationStatus === "Verified";
  const isPending = page.verificationStatus === "Pending";

  return (
    <div className="min-h-screen bg-[#060B12] text-white flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] opacity-25 pointer-events-none ${
        isVerified ? "bg-emerald-500" :
        isPending ? "bg-amber-500" :
        "bg-red-500"
      }`} />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-slate-800 relative z-10">
        
        {/* Top Header Banner */}
        <div className={`p-6 text-center border-b ${
          isVerified ? "bg-emerald-950/40 border-emerald-500/20" :
          isPending ? "bg-amber-950/40 border-amber-500/20" :
          "bg-red-950/40 border-red-500/20"
        }`}>
          {/* Logo element */}
          {page.logo ? (
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-700 bg-white p-1">
              <img src={page.logo} alt={page.companyName} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/20 flex items-center justify-center shadow-lg border-2 border-accent/40 text-2xl font-black text-white">
              {page.companyName.charAt(0)}
            </div>
          )}

          {/* Verification Status Badge */}
          <div>
            {isVerified ? (
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm tracking-wide">VERIFIED AUTHENTIC</span>
              </div>
            ) : isPending ? (
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full border border-amber-500/30 shadow-sm">
                <Info className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm tracking-wide">PENDING VERIFICATION</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full border border-red-500/30 shadow-sm">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="font-bold text-sm tracking-wide">WARNING: UNVERIFIED</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Body */}
        <div className="p-6 flex flex-col items-center text-center">
          <h1 className="text-2xl font-black text-white mb-1">{page.productName}</h1>
          <p className="text-xs font-semibold text-accent mb-6 uppercase tracking-wider">{page.brandName}</p>

          <div className="w-full bg-slate-950/60 rounded-2xl p-5 mb-6 text-left border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase">Product ID</span>
              <span className="text-sm font-bold text-white font-mono">{page.productId}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase">Manufacturer</span>
              <span className="text-sm font-bold text-white">{page.companyName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase">Date Checked</span>
              <span className="text-sm font-bold text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {page.description && (
            <div className="w-full text-left bg-slate-950/60 rounded-2xl p-5 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2">Additional Information</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {page.description}
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-950 p-4 text-center border-t border-slate-800">
          <Link href="/" className="text-xs text-slate-400 hover:text-white font-semibold tracking-wider inline-flex items-center justify-center uppercase transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-accent" /> Authenticated via Matrix Tags
          </Link>
        </div>
      </div>
    </div>
  );
}
