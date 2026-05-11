import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const image = sectionRef.current.querySelector('.philosophy-image')
    const textEls = sectionRef.current.querySelectorAll('.philosophy-text')

    if (image) {
      gsap.fromTo(
        image,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
          delay: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="bg-cream min-h-[80vh] flex flex-col md:flex-row"
    >
      {/* Image - 50% */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto">
        <img
          src="/assets/philosophy-studio.jpg"
          alt="Our studio"
          className="philosophy-image w-full h-full object-cover opacity-0"
        />
      </div>

      {/* Text - 50% */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 md:py-0">
        <span className="philosophy-text accent-text text-gold opacity-0">
          OUR PHILOSOPHY
        </span>
        <h2 className="philosophy-text heading-xxl text-text-dark mt-6 opacity-0">
          We don't just take photographs. We craft visual stories that move people.
        </h2>
        <p className="philosophy-text body-large text-text-dark/70 mt-8 max-w-[480px] opacity-0">
          Every project begins with a conversation. We listen to your vision, understand
          your story, and then translate it into images that resonate. Our approach blends
          technical precision with artistic intuition — the result is photography that feels
          both timeless and alive.
        </p>
        <span className="philosophy-text body-large text-gold hover:underline transition-all duration-300 mt-10 inline-block w-fit cursor-pointer opacity-0">
          Meet the Team →
        </span>
      </div>
    </section>
  )
}
