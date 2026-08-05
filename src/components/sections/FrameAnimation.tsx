'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FrameAnimationProps {
  frames: string[]
  totalFrames: number
  sectionId: string
  headline: string
  description: string
  label: string
  labelColor?: string
}

export function FrameAnimation({
  frames,
  totalFrames,
  sectionId,
  headline,
  description,
  label,
  labelColor = '#2563EB',
}: FrameAnimationProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    const textEl = textRef.current
    if (!canvas || !section || !textEl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()

    // Preload all frames
    let loadedCount = 0
    const images: HTMLImageElement[] = []
    imagesRef.current = images

    const renderFrame = (index: number) => {
      const img = images[index]
      if (!img || !img.complete) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      // Cover fit
      const imgAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = w / h
      let drawW = w
      let drawH = h
      let offsetX = 0
      let offsetY = 0
      if (imgAspect > canvasAspect) {
        drawH = h
        drawW = h * imgAspect
        offsetX = (w - drawW) / 2
      } else {
        drawW = w
        drawH = w / imgAspect
        offsetY = (h - drawH) / 2
      }
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
    }

    // Load frames
    frames.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loadedCount++
        images[i] = img
        if (i === 0) renderFrame(0)
      }
      img.onerror = () => {
        loadedCount++
        // Create placeholder colored frame
        const offscreen = document.createElement('canvas')
        offscreen.width = 800
        offscreen.height = 600
        const octx = offscreen.getContext('2d')!
        octx.fillStyle = '#0a1628'
        octx.fillRect(0, 0, 800, 600)
        const placeholder = new Image()
        placeholder.src = offscreen.toDataURL()
        images[i] = placeholder
      }
    })

    // ScrollTrigger setup
    const obj = { frame: 0 }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalFrames * 12}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.round(self.progress * (frames.length - 1))
        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex
          renderFrame(frameIndex)
        }
      },
    })

    // Text animation
    gsap.fromTo(
      textEl,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    )

    const handleResize = () => {
      setSize()
      renderFrame(frameIndexRef.current)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      st.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [frames, totalFrames])

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="relative h-screen w-full overflow-hidden bg-dark-hero flex items-center"
      aria-label={headline}
    >
      {/* Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-hero/90 via-dark-hero/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/60 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      {/* Text content */}
      <div ref={textRef} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          {/* Category label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ background: `${labelColor}20`, color: labelColor, border: `1px solid ${labelColor}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: labelColor }} />
            {label}
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {headline}
          </h2>

          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
