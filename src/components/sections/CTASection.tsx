'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      className="relative py-32 animated-gradient-bg overflow-hidden border-t border-white/5"
      aria-labelledby="cta-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Deep dark base overlay */}
        <div className="absolute inset-0 bg-[#060B12]/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F97316]/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[80px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-xs font-semibold uppercase tracking-widest border border-[#F97316]/20 mb-8 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
            Ready to Protect Your Products?
          </div>

          <h2
            id="cta-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-4xl mx-auto"
          >
            Let&apos;s build something
            <br />
            <span className="gradient-text-orange">worth protecting.</span>
          </h2>

          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            From custom hologram design to large-scale production — our team is ready
            to understand your requirements and deliver a solution that works.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] hover:scale-105 text-white rounded-2xl text-base font-bold transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(249,115,22,0.8)]"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="tel:+918989968006"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl text-base font-semibold transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
