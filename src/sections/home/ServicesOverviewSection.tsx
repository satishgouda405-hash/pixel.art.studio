import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Camera, Heart, Briefcase, Wand2 } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Camera,
    name: 'Portrait Photography',
    description:
      'From headshots to creative portraits, we capture the essence of who you are. Studio and on-location sessions available.',
  },
  {
    icon: Heart,
    name: 'Wedding & Events',
    description:
      'Documentary-style coverage of your most important days. Relaxed, unobtrusive, and always beautiful.',
  },
  {
    icon: Briefcase,
    name: 'Commercial Work',
    description:
      'Product photography, brand campaigns, and lookbooks that make your business stand out.',
  },
  {
    icon: Wand2,
    name: 'Photo Editing',
    description:
      'Expert retouching, color grading, and compositing. We polish every pixel to perfection.',
  },
]

export default function ServicesOverviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const cards = sectionRef.current.querySelectorAll('.service-card')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef} className="bg-dark py-[120px] md:py-[120px] px-6">
      {/* Section Header */}
      <div className="text-center mb-20">
        <span className="accent-text text-gold block mb-4">WHAT WE DO</span>
        <p className="body-large text-white/50">
          Four disciplines, one vision — extraordinary imagery
        </p>
      </div>

      {/* Card Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <div
              key={i}
              className="service-card bg-cream p-8 md:p-12 rounded-sm hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <Icon size={48} className="text-gold" strokeWidth={1.5} />
              <h3 className="heading-l text-text-dark mt-6">{service.name}</h3>
              <p className="body-large text-text-dark/70 mt-4">{service.description}</p>
              <Link
                to="/services"
                className="body-small text-gold hover:underline transition-all duration-300 mt-6 inline-block"
              >
                Learn More →
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
