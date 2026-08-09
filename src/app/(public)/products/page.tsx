import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Tag, Package, Circle, Layers, Sticker } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Products | Security Holograms, Labels & Packaging Solutions',
  description:
    'Explore label4security complete range of security holograms, authentication labels, shrink sleeves, dome labels, and industrial packaging solutions.',
}

const products = [
  {
    slug: 'security-holograms',
    name: 'Security Holograms',
    tagline: 'Multi-layer holographic protection for genuine product authentication.',
    description:
      'Our security holograms use advanced multi-layer holographic technology to create authentication features that are virtually impossible to replicate without specialized equipment. Available in 2D, 3D, flip, and custom designs.',
    icon: Shield,
    color: '#2563EB',
    applications: ['Pharmaceuticals', 'FMCG', 'Electronics', 'Government Documents', 'Luxury Goods', 'Automotive Parts'],
    features: ['2D/3D Holograms', 'Scratch-off variants', 'Custom designs', 'Tamper evident', 'Unique serial numbers', 'Microtext security'],
  },
  {
    slug: 'security-labels',
    name: 'Security Labels',
    tagline: 'Tamper-evident labels that reveal unauthorized access instantly.',
    description:
      'Security labels designed to provide immediate visual evidence of tampering. Our VOID labels, destructible labels, and tamper-evident seals protect products across industries where authenticity and security are non-negotiable.',
    icon: Tag,
    color: '#F97316',
    applications: ['Consumer Electronics', 'Automotive', 'Pharmaceuticals', 'Food & Beverage', 'Cosmetics', 'Software'],
    features: ['VOID labels', 'Destructible labels', 'Barcode integration', 'Sequential numbering', 'Anti-copy features', 'UV printing'],
  },
  {
    slug: 'shrink-sleeves',
    name: 'Shrink Sleeves & Bottle Seals',
    tagline: '360° brand coverage with tamper-evident full-wrap packaging.',
    description:
      'Full-wrap shrink sleeve labels provide 360-degree branding surface and built-in tamper evidence. Ideal for bottles, containers, and uniquely shaped packaging where label coverage and brand impact are critical.',
    icon: Package,
    color: '#8b5cf6',
    applications: ['Beverages', 'Pharmaceuticals', 'Personal Care', 'Food Products', 'Household Chemicals', 'Nutraceuticals'],
    features: ['Full-wrap coverage', 'Tamper evident', 'High-definition print', 'Food-grade materials', 'Various shrink ratios', 'Custom perforation'],
  },
  {
    slug: 'dome-labels',
    name: 'Dome Labels',
    tagline: 'Crystal-clear epoxy dome labels for premium product branding.',
    description:
      'Our dome labels use optically clear epoxy resin to create a distinctive 3D domed surface that elevates product presentation. Exceptionally durable with superior UV and scratch resistance for long-lasting brand impact.',
    icon: Circle,
    color: '#10b981',
    applications: ['Electronic Appliances', 'Automotive Accessories', 'Promotional Products', 'Industrial Equipment', 'Premium Packaging', 'Brand Identity'],
    features: ['3D epoxy dome', 'Custom shapes', 'UV resistant', 'Durable finish', 'High gloss', 'Scratch resistant'],
  },
  {
    slug: 'industrial-labels',
    name: 'Industrial Labels',
    tagline: 'High-performance labels engineered for demanding industrial environments.',
    description:
      'Industrial labels built to withstand extreme conditions including high temperatures, chemical exposure, moisture, and outdoor weathering. Engineered for reliability in demanding manufacturing and logistics environments.',
    icon: Layers,
    color: '#f59e0b',
    applications: ['Manufacturing Equipment', 'Chemical Containers', 'Electrical Panels', 'Automotive Parts', 'Logistics & Warehousing', 'Safety Compliance'],
    features: ['Chemical resistant', 'High temp variants', 'Barcode & QR', 'Custom substrates', 'Weatherproof', 'High adhesion'],
  },
  {
    slug: 'pvc-vinyl-stickers',
    name: 'PVC & Vinyl Stickers',
    tagline: 'Durable, weather-resistant stickers for branding and identification.',
    description:
      'High-quality PVC and vinyl stickers for indoor and outdoor applications. Perfect for product branding, vehicle graphics, promotional use, and asset identification where durability and visual impact are essential.',
    icon: Sticker,
    color: '#ef4444',
    applications: ['Product Branding', 'Vehicle Graphics', 'Promotional Materials', 'Asset Tagging', 'Retail Displays', 'Outdoor Signage'],
    features: ['Outdoor grade', 'Custom die-cut', 'Weather resistant', 'High adhesion', 'Glossy/matte finish', 'Long durability'],
  },
]

export default function ProductsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-40 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest border border-white/10 mb-6">
              Our Products
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Authentication
              <br />
              <span className="gradient-text">that performs.</span>
            </h1>
            <p className="text-white/50 text-xl leading-relaxed max-w-xl">
              Six product categories engineered for manufacturers who need authentication
              and labeling solutions that actually work under real-world conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white" aria-labelledby="products-list-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="products-list-heading" className="sr-only">All Products</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 product-card"
                aria-label={`View ${product.name} details`}
              >
                <div className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${product.color}15`, border: `1px solid ${product.color}25` }}
                    >
                      <product.icon
                        className="w-7 h-7"
                        style={{ color: product.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-200 mb-1">
                        {product.name}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.slice(0, 4).map((feat) => (
                      <span
                        key={feat}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-600"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: product.color }}
                  >
                    View Product Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
