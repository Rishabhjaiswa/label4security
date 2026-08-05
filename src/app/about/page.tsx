import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { Factory, Shield, Award, Microscope, Settings, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | label4security',
  description:
    'Learn about label4security — our manufacturing philosophy, quality commitment, and why precision in authentication labeling matters for manufacturers across India.',,
}

const timeline = [
  { year: '2016', title: 'Founded', desc: 'label4security established with a vision to bring precision authentication labeling to Indian manufacturers.' },,
  { year: '2018', title: 'Hologram Division', desc: 'Launched dedicated security hologram manufacturing with advanced holographic mastering equipment.' },
  { year: '2020', title: 'Dome Labels', desc: 'Expanded into 3D dome label production with specialized epoxy dispensing technology.' },
  { year: '2022', title: 'Industrial Scale', desc: 'Scaled manufacturing capacity for industrial labels and high-volume shrink sleeve production.' },
  { year: '2024', title: 'Digital Integration', desc: 'Introduced QR code and digital traceability integration across product lines.' },
  { year: '2026', title: 'Today', desc: 'Serving manufacturers across industries with six product categories and state-of-art production infrastructure.' },
]

const values = [
  {
    icon: Shield,
    title: 'Uncompromising Quality',
    desc: 'Every label undergoes rigorous quality control. We do not ship products that do not meet specification.',
    color: '#2563EB',
  },
  {
    icon: Microscope,
    title: 'Precision Engineering',
    desc: 'Authentication features are engineered at the micron level. Our holograms are designed to be forensically secure.',
    color: '#F97316',
  },
  {
    icon: Settings,
    title: 'Manufacturing Excellence',
    desc: 'We operate purpose-built manufacturing infrastructure designed specifically for security and authentication label production.',
    color: '#8b5cf6',
  },
  {
    icon: Leaf,
    title: 'Responsible Production',
    desc: 'We source materials responsibly and continuously work to minimize our environmental impact across the supply chain.',
    color: '#10b981',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest border border-white/10 mb-6">
            About label4security
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-tight mb-8">
            Manufacturing
            <br />
            <span className="gradient-text">trust.</span>
          </h1>
          <p className="text-white/50 text-xl leading-relaxed max-w-2xl">
            label4security was built by people who understand manufacturing — the pressures,
            the quality standards, and the cost of getting labeling wrong.
            We exist to get it right.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest border border-accent/20 mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-primary leading-tight mb-6">
                Authenticity is
                <br />
                not optional.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Our mission is simple: to give manufacturers the authentication and labeling
                tools they need to protect their products, their consumers, and their brands —
                at a quality level that reflects the value of what they make.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed">
                We believe that a label is not just a sticker. It is a promise.
                A promise that the product inside is genuine, unaltered, and safe.
                That promise starts with us.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <Factory className="w-48 h-48 text-accent/20" strokeWidth={0.75} />
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-3xl" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent-secondary/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50" aria-labelledby="values-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="values-heading" className="text-4xl sm:text-5xl font-black text-primary mb-4">
              Manufacturing Philosophy
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              The values that guide every decision we make on the production floor.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${val.color}15` }}
                >
                  <val.icon className="w-6 h-6" style={{ color: val.color }} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{val.title}</h3>
                <p className="text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white" aria-labelledby="timeline-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest border border-accent/20 mb-6">
              Our Journey
            </div>
            <h2 id="timeline-heading" className="text-4xl sm:text-5xl font-black text-primary mb-4">
              Two decades of precision.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" aria-hidden="true" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex gap-8 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-32 text-right">
                        <span className="text-sm font-bold text-accent">{item.year}</span>
                      </div>
                    </div>
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div className="w-3 h-3 rounded-full bg-accent border-2 border-white shadow-md" />
                    </div>
                    <div className="pb-8">
                      <h3 className="font-bold text-primary mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure teaser */}
      <section className="py-24 bg-primary" aria-labelledby="infra-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest border border-white/10 mb-6">
              Infrastructure
            </div>
            <h2 id="infra-heading" className="text-4xl sm:text-5xl font-black text-white mb-6">
              Purpose-built for
              <br />
              <span className="gradient-text">security label production.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Our manufacturing facility is designed exclusively for authentication label and
              security packaging production. Every machine, every process, every workflow is
              optimized for precision, consistency, and security.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Holographic Mastering', desc: 'In-house hologram origination' },
                { label: 'Quality Control', desc: 'Multi-stage inspection process' },
                { label: 'Controlled Environment', desc: 'Clean room manufacturing zones' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="w-2 h-2 rounded-full bg-accent mb-3" />
                  <h3 className="font-bold text-white text-sm mb-1">{item.label}</h3>
                  <p className="text-white/40 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
