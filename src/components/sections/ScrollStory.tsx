'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollStoryProps {
  hologramFrames?: number
  shrinkFrames?: number
  domeFrames?: number
}

export function ScrollStory({ hologramFrames, shrinkFrames, domeFrames }: ScrollStoryProps) {
  // We use the exact unique frame counts (before they start repeating)
  const animations = [
    {
      id: 'hologram',
      folder: '/frames/hologram',
      count: 80, // Unique frames before loop
      label: 'Security Hologram',
      headline: 'Advanced Security\nHolograms',
      description:
        'Protect products against duplication using multi-layer holographic authentication technology.',
      labelColor: '#2563EB',
      ext: 'jpg',
    },
    {
      id: 'shrink',
      folder: '/frames/shrink',
      count: 270, // Unique frames before loop
      label: 'Shrink Packaging',
      headline: 'Premium Shrink\nSleeve Packaging',
      description:
        'Tamper evident packaging designed for complete brand protection and shelf appeal.',
      labelColor: '#F97316',
      ext: 'jpg',
    },
    {
      id: 'dome',
      folder: '/frames/dome',
      count: 240, // Unique frames before loop
      label: 'Dome Labels',
      headline: 'Premium 3D\nDome Labels',
      description:
        'Crystal-clear epoxy labels delivering premium branding with exceptional durability.',
      labelColor: '#10b981',
      ext: 'jpg',
    },
  ]

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      animations.forEach((anim) => {
        const section = document.getElementById(`story-${anim.id}`)
        const canvas = section?.querySelector('canvas') as HTMLCanvasElement | null
        const textContainer = section?.querySelector('[data-text]') as HTMLElement | null
        
        if (!section || !canvas || !textContainer) return

        const c = canvas.getContext('2d')
        if (!c) return

        const setSize = () => {
          // Match the canvas resolution to its actual display size in the frame
          const rect = canvas.parentElement?.getBoundingClientRect()
          if (rect) {
            canvas.width = rect.width
            canvas.height = rect.height
          }
        }
        setSize()

        const imgCache: Record<number, HTMLImageElement> = {}
        let currentFrame = 0
        let lastDrawnImg: HTMLImageElement | null = null
        // Debounce timer for buffer loading to prevent request bursts
        let bufferTimer: ReturnType<typeof setTimeout> | null = null

        const drawImageToCanvas = (img: HTMLImageElement) => {
          lastDrawnImg = img
          const { width: w, height: h } = canvas
          c.clearRect(0, 0, w, h)
          
          const imgAspect = img.naturalWidth / img.naturalHeight
          const canvasAspect = w / h
          let dw = w, dh = h, ox = 0, oy = 0
          
          // CONTAIN logic - ensures the whole image is always visible
          if (imgAspect > canvasAspect) {
            dw = w
            dh = w / imgAspect
            oy = (h - dh) / 2
          } else {
            dh = h
            dw = h * imgAspect
            ox = (w - dw) / 2
          }
          c.drawImage(img, ox, oy, dw, dh)
        }

        const loadFrame = (index: number) => {
          if (imgCache[index]) return imgCache[index]
          const img = new Image()
          const n = String(index + 1).padStart(4, '0')
          img.src = `${anim.folder}/${n}.${anim.ext}`
          // Mark slot immediately to avoid duplicate requests
          imgCache[index] = img
          return img
        }

        const loadAndDrawFrame = (index: number) => {
          const cached = imgCache[index]
          if (cached && cached.complete && cached.naturalWidth > 0) {
            drawImageToCanvas(cached)
            return
          }

          const img = loadFrame(index)
          img.onload = () => {
            if (currentFrame === index) {
              drawImageToCanvas(img)
            }
          }
          img.onerror = () => {
            // Fallback: draw last known good frame to prevent black screens
            if (lastDrawnImg) drawImageToCanvas(lastDrawnImg)
          }
        }

        // Only load the very first frame on mount — not all frames upfront
        loadAndDrawFrame(0)

        // Create a timeline to sync both the frame scrub AND the text reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=1500', // Fixed scroll distance for a smooth, satisfying experience regardless of frame count
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const nextFrame = Math.min(
                anim.count - 1,
                Math.floor(self.progress * (anim.count - 1))
              )
              
              if (nextFrame !== currentFrame) {
                currentFrame = nextFrame
                loadAndDrawFrame(currentFrame)
                
                // Debounced buffer: only pre-load next 2 frames after scroll settles
                // This prevents a burst of dozens of parallel requests during fast scrolling
                if (bufferTimer) clearTimeout(bufferTimer)
                bufferTimer = setTimeout(() => {
                  for (let i = 1; i <= 2; i++) {
                    if (currentFrame + i < anim.count) {
                      loadFrame(currentFrame + i)
                    }
                  }
                }, 80)
              }
            }
          }
        })

        // Text smoothly appears and moves up based on scroll progress (first 20% of the section's scroll)
        tl.fromTo(
          textContainer,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" },
          0 // Start at the very beginning of the scroll timeline
        )
        
        // Ensure it stays fully visible for the remaining 80% of the scroll
        tl.to(textContainer, { opacity: 1, duration: 0.8 }, 0.2)

        window.addEventListener('resize', () => {
          setSize()
          if(lastDrawnImg) {
            drawImageToCanvas(lastDrawnImg)
          }
        })
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef}>
      {animations.map((anim) => (
        <section
          key={anim.id}
          id={`story-${anim.id}`}
          className="relative w-full h-screen overflow-hidden bg-dark-hero flex items-center"
          aria-label={anim.headline.replace('\n', ' ')}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* Left Side: Scrub-linked Text Reveal */}
              <div data-text className="max-w-xl relative z-10 opacity-0">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-8 shadow-lg backdrop-blur-md"
                  style={{
                    background: `${anim.labelColor}15`,
                    color: anim.labelColor,
                    border: `1px solid ${anim.labelColor}30`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: anim.labelColor }} />
                  {anim.label}
                </div>

                <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 whitespace-pre-line tracking-tight">
                  {anim.headline}
                </h2>

                <p className="text-white/60 text-xl leading-relaxed mb-10">
                  {anim.description}
                </p>

                <a
                  href={`/products/${anim.id === 'hologram' ? 'security-holograms' : anim.id === 'shrink' ? 'shrink-sleeves' : 'dome-labels'}`}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: anim.labelColor,
                    color: '#ffffff',
                    boxShadow: `0 10px 30px -10px ${anim.labelColor}80`,
                  }}
                >
                  Explore Solution
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Right Side: The Premium Image Frame */}
              <div className="relative flex justify-center items-center w-full aspect-square max-h-[70vh]">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden glass border border-white/10 shadow-2xl p-4">
                  {/* Inner bezel to look like a premium screen/frame */}
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-black/40 relative border border-white/5 shadow-inner">
                    <canvas className="w-full h-full" aria-hidden="true" />
                  </div>
                </div>

                {/* Decorative glowing orb behind the frame */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 rounded-full blur-[100px] opacity-20 pointer-events-none"
                  style={{ background: anim.labelColor }}
                />
              </div>

            </div>
          </div>

          {/* Frame counter (dev hint, hidden in production) */}
          <div className="absolute bottom-6 right-6 hidden" aria-hidden="true">
            <span className="text-white/20 text-xs font-mono">{anim.count} frames</span>
          </div>
        </section>
      ))}
    </div>
  )
}

