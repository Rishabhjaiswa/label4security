'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { ProductImage } from '@/lib/productImages'

interface ProductGalleryProps {
  images: ProductImage[]
  accentColor?: string
}

export function ProductGallery({ images, accentColor = '#2563EB' }: ProductGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

  if (images.length === 0) return null

  return (
    <>
      {/* Gallery Grid */}
      <div className="product-gallery-grid">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => openLightbox(index)}
            className="gallery-item group relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ '--accent': accentColor } as React.CSSProperties}
            aria-label={`View ${image.alt} full size`}
          >
            <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-1 max-w-[70%]">
                  {image.alt}
                </span>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 translate-y-2 group-hover:translate-y-0"
                  style={{ background: accentColor }}
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/10"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-6 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/10">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Main image */}
          <div
            className="lightbox-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm text-white text-sm font-medium border border-white/10 max-w-lg text-center">
            {images[activeIndex].alt}
          </div>
        </div>
      )}
    </>
  )
}
