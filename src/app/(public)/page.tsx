import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { ScrollStory } from '@/components/sections/ScrollStory'
import { AboutStorySection } from '@/components/sections/AboutStorySection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { CTASection } from '@/components/sections/CTASection'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Matrix Tags | Security Holograms, Authentication Labels & Packaging Solutions',
  description:
    "India's trusted manufacturer of security holograms, authentication labels, shrink sleeves, dome labels, and industrial packaging solutions.",
}

export default function HomePage() {
  const getFrameCount = (folder: string) => {
    try {
      const dir = path.join(process.cwd(), 'public', folder)
      return fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).length
    } catch {
      return 0
    }
  }

  return (
    <>
      {/* Section 1: Premium Hero */}
      <HeroSection />

      {/* Section 2: Scroll Story — Frame Animations */}
      <ScrollStory 
        hologramFrames={getFrameCount('frames/hologram')}
        shrinkFrames={getFrameCount('frames/shrink')}
        domeFrames={getFrameCount('frames/dome')}
      />

      {/* Section 3: About Matrix Tags — Storytelling */}
      <AboutStorySection />

      {/* Section 4: Product Showcase */}
      <ProductsSection />

      {/* Section 5: CTA */}
      <CTASection />
    </>
  )
}
