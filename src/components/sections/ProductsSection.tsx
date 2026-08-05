'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Tag, Package, Circle, Layers, Sticker } from 'lucide-react'

const products = [
  {
    slug: 'security-holograms',
    name: 'Security Holograms',
    tagline: 'Multi-layer holographic protection for genuine product authentication.',
    icon: Shield,
    color: '#2563EB',
    image: '/images/security_hologram.webp',
    features: ['Custom Hologram Stickers', '2D/3D Holograms', 'Dot Matrix Holograms', 'Transparent Holograms', 'Tamper Evident Holograms', 'VOID Holograms', 'Warranty Holograms', 'Security Seal Holograms', 'Hot Stamping Holograms', 'Hologram Foils', 'Destructible Holograms', 'Anti-Counterfeit Holograms'],
  },
  {
    slug: 'security-labels',
    name: 'Security Labels',
    tagline: 'Tamper-evident labels that reveal unauthorized access instantly.',
    icon: Tag,
    color: '#F97316',
    image: '/images/security_label.avif',
    features: ['QR Labels', 'Barcode Labels', 'Serialized Labels', 'UID Labels', 'RFID Labels', 'NFC Labels', 'Authentication Labels', 'Asset Labels', 'Warranty Labels', 'VOID Labels', 'Tamper Evident Labels'],
  },
  {
    slug: 'product-labels',
    name: 'Product Labels',
    tagline: 'Premium custom labels for branding across all retail product categories.',
    icon: Tag,
    color: '#ec4899',
    image: '/images/product_l.webp',
    features: ['Cosmetic Labels', 'Food Labels', 'Beverage Labels', 'Pharmaceutical Labels', 'Chemical Labels', 'Lubricant Labels', 'Honey Labels', 'Bottle Labels', 'Jar Labels', 'Packaging Labels', 'Custom Product Labels'],
  },
  {
    slug: 'shrink-sleeves',
    name: 'Shrink Sleeves & Bottle Seals',
    tagline: '360° brand coverage with tamper-evident full-wrap packaging.',
    icon: Package,
    color: '#8b5cf6',
    image: '/images/shrink.png',
    features: ['PVC Shrink Sleeves', 'PET Shrink Sleeves', 'Printed Shrink Sleeves', 'Bottle Neck Sleeves', 'Heat Shrink Bands', 'Bottle Cap Seals', 'Tamper Evident Bottle Seals', 'Pharmaceutical Bottle Seals'],
  },
  {
    slug: 'dome-labels',
    name: 'Dome Labels',
    tagline: 'Crystal-clear epoxy dome labels for premium product branding.',
    icon: Circle,
    color: '#10b981',
    image: '/images/dome_sticker.jpg',
    features: ['Epoxy Dome Stickers', 'Polyurethane Dome Labels', '3D Dome Stickers', 'Resin Dome Labels', 'Domed Nameplates', 'Logo Dome Stickers'],
  },
  {
    slug: 'industrial-labels',
    name: 'Industrial Labels',
    tagline: 'High-performance labels engineered for demanding industrial environments.',
    icon: Layers,
    color: '#f59e0b',
    image: '/images/industry_label.jpg',
    features: ['Machine Labels', 'Equipment Labels', 'Rating Plates', 'Polycarbonate Labels', 'Membrane Panel Labels', 'Graphic Overlays', 'Electrical Panel Labels', 'Safety Labels', 'Warning Labels'],
  },
  {
    slug: 'pvc-vinyl-stickers',
    name: 'PVC & Vinyl Stickers',
    tagline: 'Durable, weather-resistant stickers for branding and identification.',
    icon: Sticker,
    color: '#ef4444',
    image: '/images/pvc_label.webp',
    features: ['PVC Stickers', 'Vinyl Stickers', 'Transparent Stickers', 'Front Gumming Stickers', 'Reverse Printed Stickers', 'Glass Stickers', 'Waterproof Stickers', 'Promotional Stickers'],
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block bg-[#0A0F1A] rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 product-card relative"
        aria-label={`Learn more about ${product.name}`}
        style={{ '--glow-color': product.color } as React.CSSProperties}
      >
        {/* Glow border on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--glow-color)] rounded-3xl transition-colors duration-500 z-20 pointer-events-none opacity-50" />
        
        {/* Visual header with Image */}
        <div className="relative h-64 w-full flex items-center justify-center overflow-hidden bg-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 ease-in-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient to blend with content below */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/40 to-transparent z-10" />

          {/* Icon Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
              style={{ background: `${product.color}40`, border: `1px solid ${product.color}50` }}
            >
              <product.icon
                className="w-6 h-6 text-white"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 relative z-20">
          <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            {product.tagline}
          </p>

          {/* Features - Scrollable */}
          <div className="mb-6 relative group/list">
            <div className="flex flex-wrap gap-2 max-h-[110px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
              {product.features.map((feat) => (
                <span
                  key={feat}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
                >
                  {feat}
                </span>
              ))}
            </div>
            {/* Fade out bottom to indicate scroll */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0A0F1A] to-transparent pointer-events-none group-hover/list:opacity-0 transition-opacity" />
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
            style={{ color: product.color }}
          >
            Explore Product
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProductsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section className="py-32 animated-gradient-bg relative" aria-labelledby="products-heading">
      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#F97316]/5 rounded-full blur-[100px] floating-orb" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] floating-orb" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 noise" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-semibold uppercase tracking-widest border border-[#F97316]/20 mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            Our Products
          </div>
          <h2 id="products-heading" className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
            Every label tells
            <br />
            <span className="gradient-text-orange">a story of trust.</span>
          </h2>
          <p className="text-slate-400 text-xl leading-relaxed">
            Six product categories. Infinite customization. One commitment to quality.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-white rounded-2xl font-bold hover:bg-[#EA580C] hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(249,115,22,0.8)]"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
