import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-white/10 mb-4">404</div>
        <h1 className="text-4xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-white/50 text-lg mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent/90 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
