import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Shield, Tag, Package, Circle, Layers, Sticker, ArrowLeft, Phone } from 'lucide-react'
import { CTASection } from '@/components/sections/CTASection'
import { ProductGallery } from '@/components/ui/ProductGallery'
import { ProductHeroImage } from '@/components/ui/ProductHeroImage'
import { ProductSectionImage } from '@/components/ui/ProductSectionImage'
import { getHeroImage, getGalleryImages, getProductImagesByCategory, getAllProductImages } from '@/lib/productImages'

const productData = {
  'security-holograms': {
    name: 'Security Holograms',
    tagline: 'Multi-layer holographic protection for genuine product authentication.',
    description:
      'Our security holograms use advanced multi-layer holographic technology to create authentication features that are virtually impossible to replicate without specialized equipment. Each hologram is engineered to provide immediate visual verification while incorporating covert security features for advanced authentication.',
    icon: Shield,
    color: '#2563EB',
    heroGradient: 'from-blue-950 to-dark-hero',
    applications: [
      'Pharmaceutical products',
      'FMCG & consumer goods',
      'Consumer electronics',
      'Government & official documents',
      'Luxury & premium goods',
      'Automotive spare parts',
    ],
    varieties: ['Custom Hologram Stickers', '2D/3D Holograms', 'Dot Matrix Holograms', 'Transparent Holograms', 'Tamper Evident Holograms', 'VOID Holograms', 'Warranty Holograms', 'Security Seal Holograms', 'Hot Stamping Holograms', 'Hologram Foils', 'Destructible Holograms', 'Anti-Counterfeit Holograms'],
    benefits: [
      'Instant visual authentication by consumers',
      'Covert features for professional verification',
      'Customizable design for brand integration',
      'Virtually impossible to counterfeit',
      'Durable in retail and shipping conditions',
      'Supports traceability with serial numbers',
    ],
    features: [
      { name: '2D/3D Holographic Effect', desc: 'Multi-layer holographic images with depth and movement.' },
      { name: 'Scratch-off Variants', desc: 'Reveal authentication codes hidden beneath the hologram.' },
      { name: 'Custom Design Integration', desc: 'Brand logo, product image, or custom artwork.' },
      { name: 'Tamper Evident Construction', desc: 'Destroys on removal, leaving VOID pattern.' },
      { name: 'Sequential Numbering', desc: 'Unique serial numbers for product traceability.' },
      { name: 'Microtext Security', desc: 'Fine text visible only under magnification.' },
    ],
    materials: ['Metalized PET', 'Transparent PET', 'Paper-backed holographic foil', 'Destructible substrate'],
    relatedProducts: ['security-labels', 'dome-labels', 'industrial-labels'],
  },
  'security-labels': {
    name: 'Security Labels',
    tagline: 'Tamper-evident labels that reveal unauthorized access instantly.',
    description:
      'Security labels engineered to provide undeniable visual evidence of tampering. Our range includes VOID labels that reveal a hidden pattern on removal, destructible labels that cannot be removed intact, and tamper-evident seals for high-value products and sensitive packaging.',
    icon: Tag,
    color: '#F97316',
    heroGradient: 'from-orange-950 to-dark-hero',
    applications: [
      'Consumer electronics packaging',
      'Automotive components',
      'Pharmaceutical seals',
      'Food & beverage lids',
      'Cosmetic products',
      'Software license packaging',
    ],
    varieties: ['QR Labels', 'Barcode Labels', 'Serialized Labels', 'UID Labels', 'RFID Labels', 'NFC Labels', 'Authentication Labels', 'Asset Labels', 'Warranty Labels', 'VOID Labels', 'Tamper Evident Labels'],
    benefits: [
      'Immediate evidence of unauthorized access',
      'Prevents product switching in packaging',
      'Supports warranty seal applications',
      'Integrates with barcode tracking systems',
      'Cost-effective security for high volumes',
      'Available in custom sizes and shapes',
    ],
    features: [
      { name: 'VOID Labels', desc: 'Reveals VOID or custom message pattern on attempted removal.' },
      { name: 'Destructible Labels', desc: 'Fragile substrate that breaks apart on removal attempt.' },
      { name: 'Barcode Integration', desc: 'Linear and 2D barcodes including QR and DataMatrix.' },
      { name: 'Sequential Numbering', desc: 'Automated numbering for lot and batch tracking.' },
      { name: 'Anti-Copy Features', desc: 'Background patterns that photocopy as VOID or Copy.' },
      { name: 'UV Printing', desc: 'Invisible fluorescent inks visible only under UV light.' },
    ],
    materials: ['Destructible vinyl', 'BOPP', 'Polyester', 'Polypropylene', 'Paper with security pattern'],
    relatedProducts: ['security-holograms', 'industrial-labels', 'pvc-vinyl-stickers'],
  },
  'product-labels': {
    name: 'Product Labels',
    tagline: 'Premium custom labels for branding across all retail product categories.',
    description: 'Custom product labels that elevate your brand identity while meeting industry compliance standards. We offer high-quality printing, premium substrates, and specialized finishes for retail packaging.',
    icon: Tag,
    color: '#ec4899',
    heroGradient: 'from-pink-950 to-dark-hero',
    applications: ['Retail packaging', 'Bottles and jars', 'Cosmetics and beauty', 'Food containers', 'Beverage cans and bottles', 'Chemical drums'],
    varieties: ['Cosmetic Labels', 'Food Labels', 'Beverage Labels', 'Pharmaceutical Labels', 'Chemical Labels', 'Lubricant Labels', 'Honey Labels', 'Bottle Labels', 'Jar Labels', 'Packaging Labels', 'Custom Product Labels'],
    benefits: [
      'Enhances brand perception on shelf', 
      'Durable under moisture and handling', 
      'Customizable sizes and die-cuts', 
      'High-resolution vibrant printing', 
      'Compliant with labeling regulations', 
      'Cost-effective for high volume'
    ],
    features: [
      { name: 'Vibrant Colors', desc: 'CMYK and Pantone matching for perfect brand colors.' },
      { name: 'Premium Finishes', desc: 'Matte, gloss, soft-touch, and metallic foiling.' },
      { name: 'Durable Substrates', desc: 'Waterproof and oil-resistant options available.' },
      { name: 'Adhesive Options', desc: 'Permanent, removable, or freezer-grade adhesives.' },
      { name: 'Roll or Sheet', desc: 'Delivered in formats optimized for your application process.' },
      { name: 'Barcode Ready', desc: 'Crisp printing for scannable UPC and EAN codes.' },
    ],
    materials: ['BOPP (Clear/White/Silver)', 'Textured Paper', 'Semi-Gloss Paper', 'Vinyl', 'PET'],
    relatedProducts: ['shrink-sleeves', 'pvc-vinyl-stickers', 'dome-labels'],
  },
  'shrink-sleeves': {
    name: 'Shrink Sleeves & Bottle Seals',
    tagline: '360° brand coverage with tamper-evident full-wrap packaging.',
    description:
      'Shrink sleeve labels provide the ultimate canvas for product branding — covering the entire container surface including complex curves and irregular shapes. Our shrink sleeves also serve as tamper-evident packaging, providing clear visual evidence if the product has been opened.',
    icon: Package,
    color: '#8b5cf6',
    heroGradient: 'from-violet-950 to-dark-hero',
    applications: [
      'Beverages & water bottles',
      'Pharmaceutical bottles',
      'Personal care & cosmetics',
      'Packaged food products',
      'Household cleaning products',
      'Nutraceuticals & supplements',
    ],
    varieties: ['PVC Shrink Sleeves', 'PET Shrink Sleeves', 'Printed Shrink Sleeves', 'Bottle Neck Sleeves', 'Heat Shrink Bands', 'Bottle Cap Seals', 'Tamper Evident Bottle Seals', 'Pharmaceutical Bottle Seals'],
    benefits: [
      '360-degree branding surface',
      'Conforms to irregular container shapes',
      'Full tamper evidence on opening',
      'Premium shelf presence',
      'Food-grade certified materials',
      'Compatible with all shrink tunnel equipment',
    ],
    features: [
      { name: 'Full-wrap Coverage', desc: '360° coverage including base and neck areas.' },
      { name: 'Tamper Evident', desc: 'Clear evidence of opening or interference.' },
      { name: 'High-definition Print', desc: 'Up to 8-color photographic quality printing.' },
      { name: 'Food-grade Materials', desc: 'Certified safe for food-contact applications.' },
      { name: 'Custom Shrink Ratios', desc: 'Engineered for specific container profiles.' },
      { name: 'Perforation Lines', desc: 'Easy-tear perforation for consumer convenience.' },
    ],
    materials: ['PETG', 'PVC', 'OPS', 'POF (Polyolefin)'],
    relatedProducts: ['security-holograms', 'security-labels', 'pvc-vinyl-stickers'],
  },
  'dome-labels': {
    name: 'Dome Labels',
    tagline: 'Crystal-clear epoxy dome labels for premium product branding.',
    description:
      'Dome labels apply a precision-measured quantity of optically clear polyurethane resin over a printed base label to create a distinctive, tactile three-dimensional domed surface. The result is a label with exceptional visual depth, a premium feel, and outstanding durability.',
    icon: Circle,
    color: '#10b981',
    heroGradient: 'from-emerald-950 to-dark-hero',
    applications: [
      'Electronic appliances & gadgets',
      'Automotive accessories',
      'Promotional merchandise',
      'Industrial equipment nameplates',
      'Premium packaging inserts',
      'Brand identity applications',
    ],
    varieties: ['Epoxy Dome Stickers', 'Polyurethane Dome Labels', '3D Dome Stickers', 'Resin Dome Labels', 'Domed Nameplates', 'Logo Dome Stickers'],
    benefits: [
      'Premium three-dimensional appearance',
      'Exceptional scratch resistance',
      'UV stable — does not yellow',
      'Waterproof and chemical resistant',
      'Durable for product lifetime',
      'Available in any shape or size',
    ],
    features: [
      { name: '3D Epoxy Dome', desc: 'Optically clear polyurethane resin dome coating.' },
      { name: 'Custom Shapes', desc: 'Any shape including complex outlines and cut-outs.' },
      { name: 'UV Resistant', desc: 'No yellowing or degradation under UV exposure.' },
      { name: 'High Gloss Finish', desc: 'Crystal-clear magnifying lens effect.' },
      { name: 'Scratch Resistant', desc: 'Hard resin surface resists abrasion.' },
      { name: 'Strong Adhesive', desc: '3M and equivalent high-bond adhesive options.' },
    ],
    materials: ['Polyurethane resin dome', 'Printed polycarbonate base', 'Printed BOPP base', '3M adhesive backing'],
    relatedProducts: ['security-holograms', 'pvc-vinyl-stickers', 'industrial-labels'],
  },
  'industrial-labels': {
    name: 'Industrial Labels',
    tagline: 'High-performance labels engineered for demanding industrial environments.',
    description:
      'Industrial labels must perform in conditions that would destroy standard labels — extreme temperatures, chemical exposure, moisture, mechanical abrasion, and outdoor weathering. Our industrial label range is engineered to maintain adhesion, legibility, and structural integrity across the full service life of the product they identify.',
    icon: Layers,
    color: '#f59e0b',
    heroGradient: 'from-amber-950 to-dark-hero',
    applications: [
      'Manufacturing equipment nameplates',
      'Chemical storage containers',
      'Electrical panels & wiring',
      'Automotive parts identification',
      'Logistics & warehouse labeling',
      'Safety & compliance marking',
    ],
    varieties: ['Machine Labels', 'Equipment Labels', 'Rating Plates', 'Polycarbonate Labels', 'Membrane Panel Labels', 'Graphic Overlays', 'Electrical Panel Labels', 'Safety Labels', 'Warning Labels'],
    benefits: [
      'Survives harsh industrial environments',
      'Maintains legibility under extreme conditions',
      'Supports regulatory compliance marking',
      'High-adhesion for difficult surfaces',
      'Long service life reduces replacement cost',
      'Available with barcodes and QR codes',
    ],
    features: [
      { name: 'Chemical Resistance', desc: 'Tested against oils, solvents, and cleaning agents.' },
      { name: 'High Temperature Variants', desc: 'Stable up to 150°C+ depending on substrate.' },
      { name: 'Barcode & QR Code', desc: 'Linear, 2D, and QR formats for tracking.' },
      { name: 'Custom Substrates', desc: 'Polyester, aluminum, polycarbonate, and more.' },
      { name: 'Weatherproof Construction', desc: 'UV stable, moisture resistant, outdoor rated.' },
      { name: 'High Adhesion', desc: 'Bonds to textured, curved, and low-energy surfaces.' },
    ],
    materials: ['Aluminum polyester', 'Polycarbonate', 'Polyester (PET)', 'Polypropylene', 'Stainless steel foil'],
    relatedProducts: ['security-labels', 'pvc-vinyl-stickers', 'security-holograms'],
  },
  'pvc-vinyl-stickers': {
    name: 'PVC & Vinyl Stickers',
    tagline: 'Durable, weather-resistant stickers for branding and identification.',
    description:
      'PVC and vinyl stickers combine visual impact with durability for indoor and outdoor applications. From product brand labels to vehicle graphics and promotional stickers — our vinyl substrates are printed with UV-stable inks and protected with laminate finishes for maximum longevity.',
    icon: Sticker,
    color: '#ef4444',
    heroGradient: 'from-red-950 to-dark-hero',
    applications: [
      'Product packaging & branding',
      'Vehicle & fleet graphics',
      'Promotional & event materials',
      'Asset identification & tagging',
      'Retail display & point-of-sale',
      'Outdoor signage & wayfinding',
    ],
    varieties: ['PVC Stickers', 'Vinyl Stickers', 'Transparent Stickers', 'Front Gumming Stickers', 'Reverse Printed Stickers', 'Glass Stickers', 'Waterproof Stickers', 'Promotional Stickers'],
    benefits: [
      'Vibrant, high-resolution printing',
      'Outdoor rated with UV stability',
      'Custom die-cut shapes available',
      'Strong adhesive for difficult surfaces',
      'Glossy and matte finish options',
      'Suitable for short and long-run orders',
    ],
    features: [
      { name: 'Outdoor Grade', desc: 'UV-stable inks and laminates for exterior use.' },
      { name: 'Custom Die-cut', desc: 'Any shape cut to precision with digital die-cutting.' },
      { name: 'Weather Resistant', desc: 'Waterproof, moisture resistant construction.' },
      { name: 'High Adhesion', desc: 'Bonds to glass, metal, plastic, painted surfaces.' },
      { name: 'Glossy/Matte Finish', desc: 'Gloss, matte, or satin laminate options.' },
      { name: 'Long Durability', desc: 'Up to 5+ years exterior rated depending on specification.' },
    ],
    materials: ['Cast vinyl', 'Calendered vinyl', 'Clear vinyl', 'White BOPP', 'Transparent polyester'],
    relatedProducts: ['security-labels', 'dome-labels', 'industrial-labels'],
  },
}

type ProductSlug = keyof typeof productData

const productNames: Record<ProductSlug, string> = {
  'security-holograms': 'Security Holograms',
  'security-labels': 'Security Labels',
  'product-labels': 'Product Labels',
  'shrink-sleeves': 'Shrink Sleeves & Bottle Seals',
  'dome-labels': 'Dome Labels',
  'industrial-labels': 'Industrial Labels',
  'pvc-vinyl-stickers': 'PVC & Vinyl Stickers',
}

export async function generateStaticParams() {
  return Object.keys(productData).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = productData[slug as ProductSlug]
  if (!product) return {}
  return {
    title: `${product.name} | label4security`,
    description: product.tagline,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = productData[slug as ProductSlug]

  if (!product) notFound()

  const relatedProducts = product.relatedProducts
    .map((s) => ({ slug: s, name: productNames[s as ProductSlug] }))
    .filter(Boolean)

  // Get images for this product
  const heroImage = getHeroImage(slug)
  const galleryImages = getGalleryImages(slug)
  const allImages = getAllProductImages(slug)
  const featureImages = getProductImagesByCategory(slug, 'feature')
  const applicationImages = getProductImagesByCategory(slug, 'application')
  const ctaImages = getProductImagesByCategory(slug, 'cta')

  return (
    <>
      {/* Hero Banner */}
      <section
        className={`relative pt-40 pb-24 bg-gradient-to-br ${product.heroGradient} overflow-hidden`}
        aria-label={`${product.name} hero`}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            style={{ background: product.color }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(${product.color} 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                style={{
                  background: `${product.color}20`,
                  color: product.color,
                  border: `1px solid ${product.color}30`,
                }}
              >
                <product.icon className="w-3.5 h-3.5" />
                Product Detail
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 max-w-3xl">
                {product.name}
              </h1>
              <p className="text-white/50 text-xl max-w-2xl leading-relaxed mb-10">
                {product.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-4 text-white font-semibold rounded-2xl text-sm transition-all duration-200 shadow-lg"
                  style={{ background: product.color }}
                >
                  Request a Sample
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+918989968006"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl text-sm transition-all duration-200 border border-white/10"
                >
                  <Phone className="w-4 h-4" />
                  Speak to an Expert
                </a>
              </div>
            </div>

            {/* Right: Hero product image */}
            {heroImage && (
              <div className="hidden lg:block">
                <ProductHeroImage image={heroImage} accentColor={product.color} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Image Gallery */}
      {allImages.length > 1 && (
        <section className="py-20 bg-white" aria-labelledby="gallery-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
                style={{
                  background: `${product.color}10`,
                  color: product.color,
                  border: `1px solid ${product.color}20`,
                }}
              >
                Product Gallery
              </div>
              <h2 id="gallery-heading" className="text-3xl sm:text-4xl font-black text-primary mb-3">
                See {product.name} Up Close
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto">
                Click any image for a detailed full-screen view.
              </p>
            </div>
            <ProductGallery images={allImages} accentColor={product.color} />
          </div>
        </section>
      )}

      {/* Description + Applications */}
      <section className={`py-24 ${allImages.length > 1 ? 'bg-slate-50' : 'bg-white'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-primary mb-6">
                What are {product.name}?
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Feature image alongside description */}
              {featureImages.length > 0 && (
                <div className="mb-8">
                  <ProductSectionImage
                    image={featureImages[0]}
                    accentColor={product.color}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
              )}

              {/* Materials */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  Materials & Substrates
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <span
                      key={mat}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium bg-slate-50 text-slate-600 border border-slate-100"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Product Varieties / Specifications
              </h3>
              <div className="flex flex-wrap gap-2 mb-10">
                {product.varieties?.map((variety) => (
                  <span
                    key={variety}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold border"
                    style={{
                      background: `${product.color}10`,
                      color: product.color,
                      borderColor: `${product.color}25`,
                    }}
                  >
                    {variety}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
                Applications
              </h3>
              <ul className="space-y-3 mb-8" role="list">
                {product.applications.map((app) => (
                  <li key={app} className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: product.color }} />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>

              {/* Application image */}
              {applicationImages.length > 0 && (
                <ProductSectionImage
                  image={applicationImages[0]}
                  accentColor={product.color}
                  aspectRatio="aspect-[16/10]"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-4xl sm:text-5xl font-black text-primary mb-4">
              Features & Specifications
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Every specification is designed with real manufacturing and supply chain challenges in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature image on left (if available) */}
            {featureImages.length > 1 && (
              <div className="lg:row-span-2">
                <ProductSectionImage
                  image={featureImages[1]}
                  accentColor={product.color}
                  aspectRatio="aspect-[3/4]"
                  className="h-full"
                />
              </div>
            )}
            
            {/* Features grid */}
            <div className={`${featureImages.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {product.features.map((feat) => (
                  <div
                    key={feat.name}
                    className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${product.color}15` }}
                    >
                      <CheckCircle2 className="w-5 h-5" style={{ color: product.color }} />
                    </div>
                    <h3 className="font-bold text-primary mb-2">{feat.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-slate-50" aria-labelledby="benefits-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
                style={{
                  background: `${product.color}15`,
                  color: product.color,
                  border: `1px solid ${product.color}25`,
                }}
              >
                Benefits
              </div>
              <h2 id="benefits-heading" className="text-4xl sm:text-5xl font-black text-primary leading-tight mb-8">
                Why choose
                <br />
                label4security for
                <br />
                {product.name}?
              </h2>

              {/* CTA image below benefits heading */}
              {ctaImages.length > 0 && (
                <div className="mt-8">
                  <ProductSectionImage
                    image={ctaImages[0]}
                    accentColor={product.color}
                    aspectRatio="aspect-[16/9]"
                  />
                </div>
              )}
            </div>
            <ul className="space-y-4" role="list">
              {product.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${product.color}20` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: product.color }}
                    />
                  </div>
                  <span className="text-slate-600 text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 bg-white" aria-labelledby="related-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="related-heading" className="text-3xl font-black text-primary mb-12">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(({ slug: rSlug, name }) => (
              <Link
                key={rSlug}
                href={`/products/${rSlug}`}
                className="group block bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:border-transparent hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-bold text-primary group-hover:text-accent transition-colors duration-200 mb-2">
                  {name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-accent font-medium">
                  View Product
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
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
