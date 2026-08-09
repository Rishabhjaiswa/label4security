import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://label4security.com'),
  title: {
    default: 'label4security | Security Holograms, Authentication Labels & Packaging Solutions',
    template: '%s | label4security',
  },
  description: "India's trusted manufacturer of security holograms, authentication labels, shrink sleeves, dome labels, and industrial packaging solutions. Protect your products with premium authentication technology.",
  keywords: [
    'security holograms India',
    'authentication labels',
    'hologram stickers manufacturer',
    'shrink sleeve packaging',
    'dome labels',
    'industrial labels',
    'tamper evident labels',
    'PVC stickers',
    'anti-counterfeit labels',
    'brand protection',
    'label4security',
  ],
  authors: [{ name: 'label4security' }],
  creator: 'label4security',
  publisher: 'label4security',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://label4security.com',
    siteName: 'label4security',
    title: 'label4security | Security Holograms & Authentication Labels',
    description: "India's trusted manufacturer of security holograms, authentication labels, and packaging solutions.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'label4security - Security Holograms & Authentication Labels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'label4security | Security Holograms & Authentication Labels',
    description: "India's trusted manufacturer of security holograms and authentication solutions.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth dark`}>
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'label4security',
              description: "India's trusted manufacturer of security holograms, authentication labels, and packaging solutions",
              url: 'https://label4security.com',
              logo: 'https://label4security.com/images/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['English', 'Hindi'],
              },
              areaServed: 'IN',
              foundingLocation: {
                '@type': 'Place',
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
