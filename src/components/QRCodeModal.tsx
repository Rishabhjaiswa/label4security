"use client";

import { useState } from "react";
import { QrCode, Download, Copy, Check, X } from "lucide-react";

interface QRCodeModalProps {
  uuid: string;
  productName: string;
  brandName: string;
}

export default function QRCodeModal({ uuid, productName, brandName }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Fallback to origin or config URL
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const verifyUrl = `${baseUrl}/verify/${uuid}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(verifyUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Fetch high-res 1000x1000 QR code for printing
      const hdQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(verifyUrl)}`;
      const response = await fetch(hdQrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      const safeName = `${productName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-qr.png`;
      link.download = safeName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-all border border-slate-700/50"
        title="View & Download QR Code"
      >
        <QrCode className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="bg-slate-900 border border-slate-850 rounded-[2.5rem] max-w-sm w-full p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
                {brandName}
              </span>
              <h3 className="text-lg font-black text-white line-clamp-1 mb-6 px-4">
                {productName}
              </h3>

              {/* QR Container */}
              <div className="bg-white p-6 rounded-3xl inline-block shadow-inner mb-6 border border-slate-200">
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${productName}`}
                  className="w-48 h-48 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Info text */}
              <p className="text-xs text-slate-400 mb-6 max-w-[240px] mx-auto leading-relaxed">
                Scan this QR code to access the official brand verification page.
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-200 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {downloading ? "Downloading..." : "Download High-Res QR"}
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-slate-800 hover:bg-slate-700/80 text-white rounded-2xl font-bold text-sm border border-slate-750 transition-all duration-250"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 opacity-70" />
                      Copy Verification URL
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
