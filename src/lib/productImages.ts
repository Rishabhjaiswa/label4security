// Product image mappings for all product pages
// Each product slug maps to an array of images with src, alt text, and placement category

export interface ProductImage {
  src: string
  alt: string
  category: 'hero' | 'gallery' | 'feature' | 'application' | 'cta'
}

export const productImages: Record<string, ProductImage[]> = {
  'security-holograms': [
    { src: '/images/products/security-holograms/hologram-1.jpg', alt: 'Custom hologram sticker with multi-layer security features', category: 'hero' },
    { src: '/images/products/security-holograms/hologram-2.jpg', alt: '2D 3D holographic label with iridescent pattern', category: 'gallery' },
    { src: '/images/products/security-holograms/hologram-3.jpg', alt: 'Security hologram with dot matrix authentication design', category: 'gallery' },
    { src: '/images/products/security-holograms/hologram-4.jpg', alt: 'Tamper-evident hologram seal on product packaging', category: 'feature' },
    { src: '/images/products/security-holograms/hologram-5.jpg', alt: 'Anti-counterfeit hologram sticker close-up detail', category: 'application' },
    { src: '/images/products/security-holograms/hologram-6.jpg', alt: 'Custom branded holographic foil for product authentication', category: 'cta' },
  ],

  'security-labels': [
    { src: '/images/products/security-labels/security-label-1.jpg', alt: 'Authentication label with QR code verification', category: 'hero' },
    { src: '/images/products/security-labels/security-label-2.jpg', alt: 'Authentication security label with barcode integration', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-3.jpg', alt: 'High-security authentication label close-up', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-4.jpg', alt: 'Barcode security label for product tracking', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-5.jpg', alt: 'Barcode label with sequential numbering system', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-6.jpg', alt: 'Barcode integration label for supply chain management', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-7.jpg', alt: 'Barcode label with anti-copy features', category: 'feature' },
    { src: '/images/products/security-labels/security-label-8.jpg', alt: 'Hologram security seal label', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-9.jpg', alt: 'Holographic security label for product verification', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-10.jpg', alt: 'Hologram security label with tamper evidence', category: 'feature' },
    { src: '/images/products/security-labels/security-label-11.jpg', alt: 'Security seal label for electronics packaging', category: 'application' },
    { src: '/images/products/security-labels/security-label-12.jpg', alt: 'Serialized security label with unique numbering', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-13.jpg', alt: 'Serialized label for batch and lot tracking', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-14.jpg', alt: 'Serial numbered label for product authentication', category: 'feature' },
    { src: '/images/products/security-labels/security-label-15.jpg', alt: 'Serialized label with sequential numbering', category: 'gallery' },
    { src: '/images/products/security-labels/security-label-16.jpg', alt: 'Serial number label for warranty tracking', category: 'application' },
    { src: '/images/products/security-labels/security-label-17.jpg', alt: 'VOID tamper-evident security label', category: 'cta' },
    { src: '/images/products/security-labels/security-label-18.jpg', alt: 'VOID label showing tamper detection pattern', category: 'gallery' },
  ],

  'product-labels': [
    { src: '/images/products/product-labels/product-label-1.jpg', alt: 'Custom bottle label for beverage branding', category: 'hero' },
    { src: '/images/products/product-labels/product-label-2.jpg', alt: 'Premium bottle label with vibrant printing', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-3.jpg', alt: 'Chemical product label with safety information', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-4.jpg', alt: 'Chemical container label with hazard markings', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-5.jpg', alt: 'Chemical drum label with regulatory compliance', category: 'feature' },
    { src: '/images/products/product-labels/product-label-6.jpg', alt: 'Custom packaging label with brand design', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-7.jpg', alt: 'Packaging label with premium matte finish', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-8.jpg', alt: 'Product packaging label with barcode integration', category: 'feature' },
    { src: '/images/products/product-labels/product-label-9.jpg', alt: 'Pharmaceutical label with dosage information', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-10.jpg', alt: 'Pharmaceutical product label for medicine packaging', category: 'gallery' },
    { src: '/images/products/product-labels/product-label-11.jpg', alt: 'Pharmaceutical label with batch tracking', category: 'application' },
    { src: '/images/products/product-labels/product-label-12.jpg', alt: 'Pharmaceutical bottle label with regulatory info', category: 'cta' },
    { src: '/images/products/product-labels/product-label-13.jpg', alt: 'Custom product label for retail branding', category: 'gallery' },
  ],

  'shrink-sleeves': [
    { src: '/images/products/shrink-sleeves/shrink-sleeve-1.jpg', alt: 'Full-wrap shrink sleeve label on product bottle', category: 'hero' },
    { src: '/images/products/shrink-sleeves/shrink-sleeve-2.jpg', alt: 'Printed shrink sleeve with 360-degree branding', category: 'gallery' },
    { src: '/images/products/shrink-sleeves/shrink-sleeve-3.jpg', alt: 'PVC shrink sleeve with high-definition printing', category: 'feature' },
    { src: '/images/products/shrink-sleeves/shrink-sleeve-4.jpg', alt: 'Tamper-evident bottle seal shrink band', category: 'cta' },
  ],

  'dome-labels': [
    { src: '/images/products/dome-labels/dome-label-1.jpg', alt: 'Crystal-clear epoxy dome label with 3D effect', category: 'hero' },
    { src: '/images/products/dome-labels/dome-label-2.jpg', alt: 'Premium dome sticker with high gloss finish', category: 'gallery' },
    { src: '/images/products/dome-labels/dome-label-3.jpg', alt: 'Polyurethane dome label with custom shape', category: 'gallery' },
    { src: '/images/products/dome-labels/dome-label-4.jpg', alt: 'Custom dome label for industrial equipment', category: 'gallery' },
    { src: '/images/products/dome-labels/dome-label-5.jpg', alt: '3D dome sticker showing resin dome coating', category: 'feature' },
    { src: '/images/products/dome-labels/dome-label-6.jpg', alt: 'Dome label collection showing various sizes and shapes', category: 'gallery' },
    { src: '/images/products/dome-labels/dome-label-7.jpg', alt: 'Resin dome label with UV-resistant clear coating', category: 'application' },
    { src: '/images/products/dome-labels/dome-label-8.jpg', alt: 'Domed nameplate with scratch-resistant finish', category: 'gallery' },
    { src: '/images/products/dome-labels/dome-label-9.jpg', alt: 'Resin dome label for premium brand identity', category: 'cta' },
  ],

  'industrial-labels': [
    { src: '/images/products/industrial-labels/industrial-label-1.jpg', alt: 'Electrical panel label for industrial equipment', category: 'hero' },
    { src: '/images/products/industrial-labels/industrial-label-2.jpg', alt: 'Electrical panel identification label', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-3.jpg', alt: 'Electrical equipment label with safety markings', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-4.jpg', alt: 'Electrical control panel label', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-5.jpg', alt: 'Safety label for industrial workplace compliance', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-6.jpg', alt: 'Safety compliance label with hazard symbols', category: 'feature' },
    { src: '/images/products/industrial-labels/industrial-label-7.jpg', alt: 'Safety warning label for equipment operation', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-8.jpg', alt: 'Industrial safety label with regulatory markings', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-9.jpg', alt: 'Safety label for chemical handling', category: 'application' },
    { src: '/images/products/industrial-labels/industrial-label-10.jpg', alt: 'Warning label for high voltage equipment', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-11.jpg', alt: 'Warning sign label for workplace safety', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-12.jpg', alt: 'Warning label with safety pictograms', category: 'feature' },
    { src: '/images/products/industrial-labels/industrial-label-13.jpg', alt: 'Warning label for industrial machinery', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-14.jpg', alt: 'Warning label collection for various hazards', category: 'gallery' },
    { src: '/images/products/industrial-labels/industrial-label-15.jpg', alt: 'Large format warning label for industrial environments', category: 'cta' },
  ],

  'pvc-vinyl-stickers': [
    { src: '/images/products/pvc-vinyl-stickers/pvc-sticker-1.webp', alt: 'Durable PVC vinyl sticker for outdoor branding', category: 'hero' },
  ],
}

// Helper: get images by category
export function getProductImagesByCategory(slug: string, category: ProductImage['category']): ProductImage[] {
  return (productImages[slug] || []).filter(img => img.category === category)
}

// Helper: get hero image
export function getHeroImage(slug: string): ProductImage | undefined {
  return (productImages[slug] || []).find(img => img.category === 'hero')
}

// Helper: get gallery images (all non-hero images for the gallery grid)
export function getGalleryImages(slug: string): ProductImage[] {
  return (productImages[slug] || []).filter(img => img.category !== 'hero')
}

// Helper: get all images for a product
export function getAllProductImages(slug: string): ProductImage[] {
  return productImages[slug] || []
}
