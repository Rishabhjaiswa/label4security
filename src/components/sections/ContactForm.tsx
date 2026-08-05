'use client'

import { Send } from 'lucide-react'

const productCategories = [
  'Security Holograms',
  'Security Labels',
  'Shrink Sleeves & Bottle Seals',
  'Dome Labels',
  'Industrial Labels',
  'PVC & Vinyl Stickers',
  'Other / Custom Requirement',
]

export function ContactForm() {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-primary mb-2">Send an Enquiry</h2>
        <p className="text-slate-500 text-sm">
          Fill in your details and we will get back to you with a tailored response.
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Contact enquiry form"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Full Name *
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Your full name"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Company *
            </label>
            <input
              id="contact-company"
              type="text"
              required
              placeholder="Company name"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Phone Number *
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Email Address *
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-product" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Product Interest *
          </label>
          <select
            id="contact-product"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 bg-white"
          >
            <option value="">Select product category</option>
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-quantity" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Approximate Quantity
          </label>
          <input
            id="contact-quantity"
            type="text"
            placeholder="e.g. 10,000 pieces per month"
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Message / Requirement
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Describe your requirement, product, industry, timeline, or any specific questions..."
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-accent/25"
        >
          <Send className="w-4 h-4" />
          Send Enquiry
        </button>

        <p className="text-center text-slate-400 text-xs">
          We will respond within 1 business day. Your details are kept confidential.
        </p>
      </form>
    </div>
  )
}
