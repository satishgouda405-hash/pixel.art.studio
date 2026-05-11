import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "Pixel Art Studio didn't just photograph our wedding — they captured the soul of the day. Every image takes us right back.",
    name: 'Sarah Henderson',
    title: 'Bride',
  },
  {
    quote:
      'Working with this team elevated our brand completely. The product shots look like they\'re from a luxury magazine.',
    name: 'James Bloom',
    title: 'Founder, Maison Bloom',
  },
  {
    quote:
      "I've never felt so comfortable in front of a camera. They made me look and feel like the best version of myself.",
    name: 'Elena Voss',
    title: 'Model',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.testimonial-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  const scrollTo = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, testimonials.length - 1))
    setActiveIndex(newIndex)
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / testimonials.length
      gsap.to(carouselRef.current, {
        scrollLeft: cardWidth * newIndex,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }

  return (
    <div ref={sectionRef} className="bg-dark py-[120px] md:py-[120px] overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-20 px-6">
        <span className="accent-text text-gold">KIND WORDS</span>
      </div>

      {/* Carousel */}
      <div className="relative max-w-[1400px] mx-auto px-6">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card flex-shrink-0 w-full md:w-[calc(33.333%-16px)] snap-start p-8 md:p-12 opacity-0"
            >
              <p className="heading-xl italic text-white leading-[1.1]">
                "{t.quote}"
              </p>
              <p className="body-large text-gold mt-10">{t.name}</p>
              <p className="body-small text-white/50 mt-1">{t.title}</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-gold fill-gold" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300 disabled:opacity-30"
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300 disabled:opacity-30"
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
