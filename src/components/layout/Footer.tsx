import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube, ArrowUpRight } from 'lucide-react'

const productLinks = [
  { href: '/products/security-holograms', label: 'Security Holograms' },
  { href: '/products/security-labels', label: 'Security Labels' },
  { href: '/products/shrink-sleeves', label: 'Shrink Sleeves & Bottle Seals' },
  { href: '/products/dome-labels', label: 'Dome Labels' },
  { href: '/products/industrial-labels', label: 'Industrial Labels' },
  { href: '/products/pvc-vinyl-stickers', label: 'PVC & Vinyl Stickers' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: '#', label: 'LinkedIn', icon: Linkedin },
  { href: '#', label: 'Twitter/X', icon: Twitter },
  { href: '#', label: 'Instagram', icon: Instagram },
  { href: '#', label: 'YouTube', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group" aria-label="label4security">
              <img
                src="/images/logo.png"
                alt="label4security logo"
                className="h-9 w-auto object-contain flex-shrink-0"
              />
              <div>
                <div className="font-bold text-xl leading-none text-white">label4security</div>
                <div className="text-[9px] text-white/40 tracking-widest uppercase mt-0.5">Since 2016</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              India&apos;s trusted manufacturer of security holograms, authentication labels, and premium packaging solutions.
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Products
            </h3>
            <ul className="space-y-3">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-0.5 translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-0.5 translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+918989968006"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200 group"
                  aria-label="Call us"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <span className="text-sm">+91 89899 68006</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:labelsecurity@gmail.com"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200"
                  aria-label="Email us"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <span className="text-sm">labelsecurity@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed">
                    India
                  </span>
                </div>
              </li>
            </ul>
            <a
              href="https://wa.me/918989968006"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 text-green-400 rounded-xl text-sm font-medium transition-all duration-200"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
