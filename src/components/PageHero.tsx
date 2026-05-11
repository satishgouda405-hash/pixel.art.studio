import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface PageHeroProps {
  title: string
  subtitle: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const titleEl = ref.current.querySelector('.page-title')
    const subEl = ref.current.querySelector('.page-subtitle')

    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', delay: 0.2 }
      )
    }
    if (subEl) {
      gsap.fromTo(
        subEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power4.out' }
      )
    }
  }, { scope: ref })

  return (
    <div
      ref={ref}
      className="min-h-[50vh] md:min-h-[50vh] flex flex-col items-center justify-center bg-dark px-6 pt-[72px]"
    >
      <h1 className="page-title heading-hero text-white text-center">{title}</h1>
      <p className="page-subtitle body-large text-white/60 text-center mt-6 max-w-xl">
        {subtitle}
      </p>
    </div>
  )
}
