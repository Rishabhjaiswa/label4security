'use client'

import Image from 'next/image'
import type { ProductImage } from '@/lib/productImages'

interface ProductSectionImageProps {
  image: ProductImage
  accentColor?: string
  aspectRatio?: string
  className?: string
}

export function ProductSectionImage({
  image,
  accentColor = '#2563EB',
  aspectRatio = 'aspect-[4/3]',
  className = '',
}: ProductSectionImageProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className={`${aspectRatio} relative overflow-hidden rounded-2xl shadow-lg border border-slate-200/50`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Bottom gradient for readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      {/* Decorative accent line */}
      <div
        className="absolute -bottom-2 left-6 right-6 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: accentColor }}
        aria-hidden="true"
      />
    </div>
  )
}
