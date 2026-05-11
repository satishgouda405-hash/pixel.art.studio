import type { LightboxImage } from '../App'
import HeroSection from '../sections/home/HeroSection'
import FeaturedWorkSection from '../sections/home/FeaturedWorkSection'
import ServicesOverviewSection from '../sections/home/ServicesOverviewSection'
import PhilosophySection from '../sections/home/PhilosophySection'
import TestimonialsSection from '../sections/home/TestimonialsSection'
import CTABannerSection from '../sections/home/CTABannerSection'

interface HomeProps {
  openLightbox: (images: LightboxImage[], startIndex: number) => void
}

export default function Home({ openLightbox }: HomeProps) {
  return (
    <main>
      <HeroSection />
      <FeaturedWorkSection openLightbox={openLightbox} />
      <ServicesOverviewSection />
      <PhilosophySection />
      <TestimonialsSection />
      <CTABannerSection />
    </main>
  )
}
