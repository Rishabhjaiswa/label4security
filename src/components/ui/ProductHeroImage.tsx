'use client'

import Image from 'next/image'
import type { ProductImage } from '@/lib/productImages'

interface ProductHeroImageProps {
  image: ProductImage
  accentColor?: string
}

export function ProductHeroImage({ image, accentColor = '#2563EB' }: ProductHeroImageProps) {
  return (
    <div className="relative group">
      {/* Glow background */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"
        style={{ background: accentColor }}
        aria-hidden="true"
      />
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
        <div className="aspect-[4/3] relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${accentColor}40 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
