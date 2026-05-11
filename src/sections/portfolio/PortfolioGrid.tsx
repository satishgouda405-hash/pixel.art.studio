import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { LightboxImage } from '../../App'

gsap.registerPlugin(ScrollTrigger)

export const portfolioItems = [
  { src: '/assets/portfolio-portrait-1.jpg', title: 'Golden Hour', category: 'portrait', aspect: '3/4' },
  { src: '/assets/portfolio-portrait-2.jpg', title: 'Studio Minimal', category: 'portrait', aspect: '3/2' },
  { src: '/assets/portfolio-portrait-3.jpg', title: 'Urban Soul', category: 'portrait', aspect: '3/4' },
  { src: '/assets/portfolio-wedding-1.jpg', title: 'The First Look', category: 'wedding', aspect: '3/2' },
  { src: '/assets/portfolio-wedding-2.jpg', title: 'Dance Floor Magic', category: 'wedding', aspect: '3/2' },
  { src: '/assets/portfolio-wedding-3.jpg', title: 'Details', category: 'wedding', aspect: '1/1' },
  { src: '/assets/portfolio-commercial-1.jpg', title: 'Signature Scent', category: 'commercial', aspect: '2/3' },
  { src: '/assets/portfolio-commercial-2.jpg', title: 'Craft Collection', category: 'commercial', aspect: '3/2' },
  { src: '/assets/portfolio-commercial-3.jpg', title: 'Brand Story', category: 'commercial', aspect: '2/3' },
  { src: '/assets/portfolio-editorial-1.jpg', title: 'Velvet Gown', category: 'editorial', aspect: '2/3' },
  { src: '/assets/portfolio-editorial-2.jpg', title: 'Monochrome', category: 'editorial', aspect: '3/2' },
  { src: '/assets/portfolio-editorial-3.jpg', title: 'The Set', category: 'editorial', aspect: '3/2' },
]

interface PortfolioGridProps {
  filter: string
  openLightbox: (images: LightboxImage[], startIndex: number) => void
}

export default function PortfolioGrid({ filter, openLightbox }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const filteredItems =
    filter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter)

  useGSAP(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.portfolio-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, { scope: gridRef, dependencies: [filter] })

  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.portfolio-item')
    items.forEach((item) => {
      gsap.set(item, { opacity: 1, scale: 1 })
    })
  }, [filter])

  const handleClick = (index: number) => {
    const lightboxImages: LightboxImage[] = filteredItems.map((item) => ({
      src: item.src,
      title: item.title,
      category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    }))
    openLightbox(lightboxImages, index)
  }

  return (
    <div className="bg-dark py-16 md:py-24 px-6">
      <div
        ref={gridRef}
        className="max-w-[1400px] mx-auto columns-1 md:columns-2 lg:columns-3 gap-6"
      >
        {filteredItems.map((item, i) => (
          <div
            key={item.src}
            ref={(el) => { itemRefs.current[i] = el }}
            className="portfolio-item break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden rounded-sm opacity-0"
            onClick={() => handleClick(i)}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-400"
              style={{ aspectRatio: item.aspect }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-dark/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="accent-text text-gold">{item.category.toUpperCase()}</span>
              <h3 className="heading-l text-white mt-2">{item.title}</h3>
              <span className="body-small text-white mt-2">View →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
