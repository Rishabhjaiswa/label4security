/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },

  // Cache frame images aggressively in the browser (1 year).
  // Once downloaded, the browser won't re-request them from Node.js.
  async headers() {
    return [
      {
        source: '/frames/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Empty turbopack config — required to silence the warning in Next.js 16
  // when running with the default Turbopack dev server.
  // Turbopack compiles pages LAZILY (only when visited), which uses far less
  // memory than webpack which compiles everything eagerly at startup.
  turbopack: {},
}

export default nextConfig
