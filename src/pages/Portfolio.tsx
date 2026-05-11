import { useState } from 'react'
import PageHero from '../components/PageHero'
import CategoryFilter from '../sections/portfolio/CategoryFilter'
import PortfolioGrid from '../sections/portfolio/PortfolioGrid'
import type { LightboxImage } from '../App'

interface PortfolioProps {
  openLightbox: (images: LightboxImage[], startIndex: number) => void
}

export default function Portfolio({ openLightbox }: PortfolioProps) {
  const [filter, setFilter] = useState('all')

  return (
    <main>
      <PageHero
        title="PORTFOLIO"
        subtitle="A curated collection of moments, frozen in time."
      />
      <CategoryFilter activeFilter={filter} onFilterChange={setFilter} />
      <PortfolioGrid filter={filter} openLightbox={openLightbox} />
    </main>
  )
}
