'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react'


const stats = [
  { label: 'Product Categories', value: '6+', icon: Award },
  { label: 'Industries Served', value: '20+', icon: Zap },
  { label: 'Authentication Layer', value: 'Multi', icon: ShieldCheck },
]

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [particles, setParticles] = useState<Array<any>>([])

  useEffect(() => {
    setParticles(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    })))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const dots: Array<{
      x: number; y: number; vx: number; vy: number; r: number; alpha: number;
    }> = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    let mouseX = -1000
    let mouseY = -1000
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', handleMouse)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Connection lines
      dots.forEach((dot, i) => {
        dots.forEach((other, j) => {
          if (j <= i) return
          const dx = dot.x - other.x
          const dy = dot.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Mouse interaction
        const mx = dot.x - mouseX
        const my = dot.y - mouseY
        const md = Math.sqrt(mx * mx + my * my)
        if (md < 120) {
          ctx.beginPath()
          ctx.moveTo(dot.x, dot.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.3 * (1 - md / 120)})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      })

      // Draw dots
      dots.forEach((dot) => {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37, 99, 235, ${dot.alpha})`
        ctx.fill()

        dot.x += dot.vx
        dot.y += dot.vy

        if (dot.x < 0 || dot.x > w) dot.vx *= -1
        if (dot.y < 0 || dot.y > h) dot.vy *= -1
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark-hero"
      aria-label="Hero section"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
        aria-hidden="true"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Radial glow orange */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#F97316]/10 rounded-full blur-[120px] hero-glow" />
        {/* Radial glow secondary orange */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500/8 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-hero to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#F97316]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            India&apos;s Trusted Security Label Manufacturer
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] tracking-tight mb-6"
          >
            Security starts
            <br />
            <span className="gradient-text-orange">authenticity.</span>
          </motion.h1>

          {/* Sub headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/50 mb-8"
          >
            Protect Every Product.{' '}
            <span className="text-white/80">Build Every Brand.</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/40 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            From multi-layer holograms to tamper-evident packaging — label4security delivers
            precision-engineered authentication and labeling solutions for manufacturers
            who refuse to compromise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/products"
              className="group flex items-center gap-2 px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] hover:scale-105 text-white rounded-2xl text-base font-bold transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(249,115,22,0.8)]"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white rounded-2xl text-base font-semibold transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              Request a Quote
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto"
          >
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4 text-[#F97316]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</div>
                <div className="text-white/40 text-xs font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/30 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
