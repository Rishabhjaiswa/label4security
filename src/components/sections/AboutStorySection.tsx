'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Factory, Award, TrendingUp } from 'lucide-react'

const storyItems = [
  {
    icon: Factory,
    tag: 'Who We Are',
    headline: 'Built from the\nshop floor up.',
    body: 'label4security was founded by manufacturing veterans who understood one truth: the label on a product is the first and last line of defense. We build authentication and labeling solutions that manufacturers can trust unconditionally.',
    color: '#2563EB',
  },
  {
    icon: Shield,
    tag: 'What We Make',
    headline: 'Engineered for\nauthenticity.',
    body: 'From multi-layer security holograms and tamper-evident seals to precision dome labels and full-wrap shrink sleeves — every product we manufacture is designed to protect, identify, and brand your products with integrity.',
    color: '#F97316',
  },
  {
    icon: TrendingUp,
    tag: 'Why It Matters',
    headline: 'Counterfeiting costs\nbillions. We cost less.',
    body: 'Counterfeit products erode brand trust and endanger consumers. Authentication labels are not just a feature — they are a business imperative. We make them accessible for manufacturers of every scale.',
    color: '#10b981',
  },
  {
    icon: Award,
    tag: 'Why label4security',
    headline: 'Premium labeling.\nReal results.',
    body: 'When manufacturers choose label4security, they choose precision engineering, consistent quality, and a partner who understands their production challenges. Our labels don\'t just look good — they perform under real-world conditions.',
    color: '#8b5cf6',
  },
]

function StoryCard({ item, index }: { item: typeof storyItems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}
    >
      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className="w-full lg:w-1/2"
      >
        <div
          className="relative rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${item.color}10 0%, ${item.color}05 100%)` }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(${item.color} 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
          <div
            className="relative w-40 h-40 rounded-3xl flex items-center justify-center"
            style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
          >
            <item.icon
              className="w-20 h-20"
              style={{ color: item.color }}
              strokeWidth={1.5}
            />
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
              style={{ background: item.color }}
            />
          </div>
          {/* Decorative rings */}
          <div
            className="absolute w-64 h-64 rounded-full border opacity-10"
            style={{ borderColor: item.color }}
          />
          <div
            className="absolute w-96 h-96 rounded-full border opacity-5"
            style={{ borderColor: item.color }}
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        className="w-full lg:w-1/2"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{
            background: `${item.color}15`,
            color: item.color,
            border: `1px solid ${item.color}25`,
          }}
        >
          {item.tag}
        </div>
        <h3 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6 whitespace-pre-line">
          {item.headline}
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          {item.body}
        </p>
      </motion.div>
    </div>
  )
}

export function AboutStorySection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section className="py-32 animated-gradient-bg relative overflow-hidden" aria-labelledby="about-story-heading">
      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-[100px] floating-orb" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full blur-[120px] floating-orb" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 noise" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-3xl mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-semibold uppercase tracking-widest border border-[#F97316]/20 mb-6 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
            About label4security
          </div>
          <h2 id="about-story-heading" className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            The story behind
            <br />
            <span className="gradient-text-orange">every label.</span>
          </h2>
          <p className="text-slate-400 text-xl leading-relaxed">
            Authentication is not just a technical process. It&apos;s a promise — to manufacturers,
            to consumers, and to the integrity of the supply chain.
          </p>
        </motion.div>

        {/* Story Items */}
        <div className="space-y-32">
          {storyItems.map((item, i) => (
            <StoryCard key={item.tag} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
