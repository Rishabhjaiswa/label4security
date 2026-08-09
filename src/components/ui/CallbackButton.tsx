'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, Send } from 'lucide-react'
import { submitEnquiry } from '@/app/actions/pages'

const productCategories = [
  'Security Holograms',
  'Security Labels',
  'Shrink Sleeves & Bottle Seals',
  'Dome Labels',
  'Industrial Labels',
  'PVC & Vinyl Stickers',
  'Other / Custom Requirement',
]

export function CallbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const fullName = (e.currentTarget.querySelector('#callback-name') as HTMLInputElement).value
    const companyName = (e.currentTarget.querySelector('#callback-company') as HTMLInputElement).value
    const phoneNumber = (e.currentTarget.querySelector('#callback-phone') as HTMLInputElement).value
    const email = (e.currentTarget.querySelector('#callback-email') as HTMLInputElement).value
    const category = (e.currentTarget.querySelector('#callback-category') as HTMLSelectElement).value
    const message = (e.currentTarget.querySelector('#callback-requirement') as HTMLTextAreaElement).value

    try {
      const res = await submitEnquiry({
        fullName,
        companyName,
        phoneNumber,
        email,
        category,
        message
      })

      if (res.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setIsOpen(false)
        }, 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating CTA Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 bg-accent text-white rounded-2xl shadow-2xl shadow-accent/40 font-semibold text-sm"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        aria-label="Request a callback"
        aria-haspopup="dialog"
      >
        <Phone className="w-4 h-4" />
        Request a Callback
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false)
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="callback-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-primary p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h2 id="callback-title" className="text-2xl font-bold text-white mb-1">
                    Request a Callback
                  </h2>
                  <p className="text-white/60 text-sm">
                    Our team will reach out within 24 hours.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Request Submitted!</h3>
                      <p className="text-slate-500 text-sm">
                        Thank you. Our team will contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      noValidate
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="callback-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                            Full Name *
                          </label>
                          <input
                            id="callback-name"
                            type="text"
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="callback-company" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                            Company *
                          </label>
                          <input
                            id="callback-company"
                            type="text"
                            required
                            placeholder="Company Name"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="callback-phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                            Phone *
                          </label>
                          <input
                            id="callback-phone"
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label htmlFor="callback-email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                            Email
                          </label>
                          <input
                            id="callback-email"
                            type="email"
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="callback-category" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                          Product Category *
                        </label>
                        <select
                          id="callback-category"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 bg-white"
                        >
                          <option value="">Select a category</option>
                          {productCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="callback-requirement" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                          Requirement
                        </label>
                        <textarea
                          id="callback-requirement"
                          rows={3}
                          placeholder="Describe your requirement, quantity, timeline..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-accent/25"
                      >
                        <Send className="w-4 h-4" />
                        Submit Request
                      </button>
                      <p className="text-center text-slate-400 text-xs">
                        Your information is secure and will not be shared.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
