import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline()

    // Image fade in with scale
    tl.fromTo(
      sectionRef.current.querySelector('.hero-image'),
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' },
      0
    )

    // Label slide in
    tl.fromTo(
      sectionRef.current.querySelector('.hero-label'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' },
      0.2
    )

    // Title lines stagger
    const titleLines = sectionRef.current.querySelectorAll('.hero-title-line')
    tl.fromTo(
      titleLines,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power4.out' },
      0.4
    )

    // Subtitle + CTA
    tl.fromTo(
      sectionRef.current.querySelector('.hero-subtitle'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' },
      1.0
    )

    tl.fromTo(
      sectionRef.current.querySelector('.hero-cta'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power4.out' },
      1.1
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-dark overflow-hidden flex flex-col md:flex-row"
    >
      {/* Left content - 45% */}
      <div className="relative z-10 w-full md:w-[45%] flex flex-col justify-center px-6 py-20 md:py-0 md:pl-6 lg:pl-12 max-w-[600px]">
        <span className="hero-label accent-text text-gold mb-6 opacity-0">
          PHOTOGRAPHY STUDIO
        </span>

        <h1 className="heading-hero">
          <span className="hero-title-line block text-white opacity-0">Where</span>
          <span className="hero-title-line block text-gold opacity-0">Light</span>
          <span className="hero-title-line block text-white opacity-0">Becomes</span>
          <span className="hero-title-line block text-gold opacity-0">Art</span>
        </h1>

        <p className="hero-subtitle body-large text-white/70 mt-8 max-w-[420px] opacity-0">
          A London-based creative studio crafting visual stories for brands, couples, and dreamers.
        </p>

        <Link
          to="/portfolio"
          className="hero-cta inline-block mt-10 accent-text bg-gold text-dark px-8 py-3 rounded-sm hover:bg-gold-light transition-colors duration-300 w-fit opacity-0"
        >
          View Our Work
        </Link>
      </div>

      {/* Right image - 55% */}
      <div className="absolute md:relative top-0 right-0 w-full md:w-[55%] h-[60vh] md:h-auto md:self-stretch">
        <img
          src="/assets/hero-portrait.jpg"
          alt="Fashion portrait"
          className="hero-image w-full h-full object-cover opacity-0"
        />
        {/* Gradient overlay for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent md:hidden" />
      </div>
    </section>
  )
}
