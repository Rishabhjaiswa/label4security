import type { Metadata } from 'next'
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | label4security',
  description:
    'Get in touch with label4security for security hologram samples, product quotations, or to discuss your labeling requirements.',
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 89899 68006',
    href: 'tel:+918989968006',
    desc: 'Monday–Saturday, 9am–6pm IST',
    color: '#2563EB',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@matrixtags.com',
    href: 'mailto:info@matrixtags.com',
    desc: 'We respond within 24 hours',
    color: '#F97316',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: undefined,
    desc: 'Manufacturing & dispatch facility',
    color: '#10b981',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Mon–Sat, 9am–6pm',
    href: undefined,
    desc: 'IST (India Standard Time)',
    color: '#8b5cf6',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-widest border border-white/10 mb-6">
            Get in Touch
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-tight mb-6">
            Let&apos;s talk
            <br />
            <span className="gradient-text">authentication.</span>
          </h1>
          <p className="text-white/50 text-xl max-w-xl leading-relaxed">
            Whether you need a sample, a quote, or simply want to understand what
            authentication solution is right for your product — we are here.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-primary mb-2">Contact Information</h2>
              <p className="text-slate-500 mb-10 leading-relaxed">
                Reach us through any of the following channels. We typically respond to
                email and form inquiries within one business day.
              </p>

              {/* Contact cards */}
              <div className="space-y-4 mb-10">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15` }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-bold text-primary hover:text-accent transition-colors duration-200 block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-bold text-primary">{item.value}</div>
                      )}
                      <div className="text-slate-400 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/918989968006"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 rounded-2xl font-semibold text-sm transition-all duration-200 mb-8"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Right: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
