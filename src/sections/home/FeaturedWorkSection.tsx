import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { LightboxImage } from '../../App'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    category: 'PORTRAIT',
    title: 'Ethereal Grace',
    description:
      'A series exploring the delicate interplay of natural light and human expression. Shot across three seasons in our London studio.',
    image: '/assets/featured-portrait.jpg',
  },
  {
    category: 'WEDDING',
    title: 'The Henderson Wedding',
    description:
      'An intimate celebration captured at a countryside estate. Every glance, every tear, every unscripted moment preserved.',
    image: '/assets/featured-wedding.jpg',
  },
  {
    category: 'COMMERCIAL',
    title: 'Maison Bloom',
    description:
      'Product photography for a luxury fragrance brand. Dramatic chiaroscuro lighting elevates each bottle to art.',
    image: '/assets/featured-commercial.jpg',
  },
  {
    category: 'EDITORIAL',
    title: 'Velvet & Shadows',
    description:
      'Fashion editorial for a leading style magazine. A study in texture, contrast, and timeless elegance.',
    image: '/assets/featured-editorial.jpg',
  },
]

interface FeaturedWorkSectionProps {
  openLightbox: (images: LightboxImage[], startIndex: number) => void
}

export default function FeaturedWorkSection({ openLightbox }: FeaturedWorkSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const rows = sectionRef.current.querySelectorAll('.project-row')
    rows.forEach((row) => {
      const image = row.querySelector('.project-image')
      const textEls = row.querySelectorAll('.project-text-anim')
      const isEven = row.classList.contains('project-even')

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, x: isEven ? 60 : -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      if (textEls.length > 0) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    })
  }, { scope: sectionRef })

  const handleViewProject = (index: number) => {
    openLightbox(
      projects.map((p) => ({
        src: p.image,
        title: p.title,
        category: p.category,
      })),
      index
    )
  }

  return (
    <div ref={sectionRef} className="bg-dark py-[120px] md:py-[120px]">
      {/* Section Header */}
      <div className="text-center mb-20 px-6">
        <span className="accent-text text-gold block mb-4">SELECTED WORK</span>
        <p className="body-large text-white/50">
          A curated collection of our finest captures
        </p>
      </div>

      {/* Project Rows */}
      <div className="max-w-[1400px] mx-auto px-6">
        {projects.map((project, i) => {
          const isEven = i % 2 !== 0
          return (
            <div
              key={i}
              className={`project-row ${isEven ? 'project-even' : ''} flex flex-col ${
                isEven ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-10 md:gap-16 py-10 md:py-20`}
            >
              {/* Image */}
              <div className="w-full md:w-[55%] overflow-hidden rounded-sm">
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full aspect-[3/2] object-cover hover:scale-[1.03] transition-transform duration-300 transition-secondary cursor-pointer"
                    onClick={() => handleViewProject(i)}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="w-full md:w-[45%] flex flex-col justify-center">
                <span className="project-text-anim accent-text text-gold">
                  {project.category}
                </span>
                <h3 className="project-text-anim heading-xl text-white mt-4">
                  {project.title}
                </h3>
                <p className="project-text-anim body-large text-white/60 mt-6 max-w-[400px]">
                  {project.description}
                </p>
                <button
                  onClick={() => handleViewProject(i)}
                  className="project-text-anim body-small text-white hover:text-gold transition-colors duration-300 mt-8 text-left w-fit"
                >
                  View Project →
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
