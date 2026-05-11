import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function CTABannerSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const textEls = sectionRef.current.querySelectorAll('.cta-anim')
    gsap.fromTo(
      textEls,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <div
      ref={sectionRef}
      className="bg-gold py-20 md:py-24 px-6 flex flex-col items-center justify-center text-center"
    >
      <h2 className="cta-anim heading-xl text-dark opacity-0">
        Ready to Create Something Beautiful?
      </h2>
      <p className="cta-anim body-large text-dark/70 mt-4 max-w-xl opacity-0">
        Book a consultation and let's discuss your vision.
      </p>
      <Link
        to="/contact"
        className="cta-anim inline-block mt-8 accent-text bg-dark text-white px-8 py-3 rounded-sm hover:bg-charcoal transition-colors duration-300 opacity-0"
      >
        Get in Touch
      </Link>
    </div>
  )
}
