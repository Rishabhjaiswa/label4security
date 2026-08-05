'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  {
    href: '/products',
    label: 'Products',
    children: [
      { href: '/products/security-holograms', label: 'Security Holograms' },
      { href: '/products/security-labels', label: 'Security Labels' },
      { href: '/products/shrink-sleeves', label: 'Shrink Sleeves & Bottle Seals' },
      { href: '/products/dome-labels', label: 'Dome Labels' },
      { href: '/products/industrial-labels', label: 'Industrial Labels' },
      { href: '/products/pvc-vinyl-stickers', label: 'PVC & Vinyl Stickers' },
    ],
  },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
        role="banner"
      >
        <nav
          className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="label4security - Home"
          >
            <div className="relative flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="label4security logo"
                className="h-9 w-auto object-contain"
              />
              <div className="absolute -inset-1 bg-accent/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-bold text-lg leading-none transition-colors duration-300',
                  isScrolled ? 'text-primary' : 'text-white'
                )}
              >
                label4security
              </span>
              <span
                className={cn(
                  'text-[9px] font-medium tracking-widest uppercase leading-none mt-0.5 transition-colors duration-300',
                  isScrolled ? 'text-slate-400' : 'text-white/50'
                )}
              >
                Since 2016
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isScrolled
                        ? 'text-slate-600 hover:text-primary hover:bg-slate-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10',
                      isActive(link.href) && (isScrolled ? 'text-primary' : 'text-white')
                    )}
                    onClick={() =>
                      setActiveDropdown(activeDropdown === link.label ? null : link.label)
                    }
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === link.label && 'rotate-180'
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 block nav-link',
                      isScrolled
                        ? 'text-slate-600 hover:text-primary hover:bg-slate-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10',
                      isActive(link.href) && (isScrolled ? 'text-primary font-semibold' : 'text-white font-semibold')
                    )}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                      role="menu"
                    >
                      <div className="p-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-primary hover:bg-slate-50 transition-all duration-150 font-medium"
                            role="menuitem"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border',
                isScrolled
                  ? 'border-accent/40 text-accent hover:bg-accent/10'
                  : 'border-white/30 text-white hover:bg-white/10'
              )}
            >
              Verify QR
            </Link>
            <Link
              href="/contact"
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                isScrolled
                  ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25'
                  : 'bg-white text-primary hover:bg-white/90'
              )}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              'lg:hidden p-2 rounded-lg transition-all duration-200',
              isScrolled
                ? 'text-primary hover:bg-slate-50'
                : 'text-white hover:bg-white/10'
            )}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-primary lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative h-full flex flex-col pt-24 pb-8 px-8">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {link.children ? (
                      <div>
                        <button
                          className="w-full flex items-center justify-between py-3 text-2xl font-semibold text-white/90 hover:text-white transition-colors"
                          onClick={() =>
                            setActiveDropdown(activeDropdown === link.label ? null : link.label)
                          }
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'w-5 h-5 transition-transform duration-200',
                              activeDropdown === link.label && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 flex flex-col gap-1">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="py-2 text-base text-white/60 hover:text-white/90 transition-colors"
                                    onClick={() => setIsMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          'block py-3 text-2xl font-semibold transition-colors',
                          isActive(link.href) ? 'text-white' : 'text-white/70 hover:text-white'
                        )}
                        onClick={() => setIsMobileOpen(false)}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 bg-accent text-white rounded-2xl text-lg font-semibold"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Get a Quote
                </Link>
                <p className="text-center text-white/30 text-sm mt-6">
                  © {new Date().getFullYear()} label4security. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
