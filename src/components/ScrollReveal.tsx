import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps<T extends ElementType = 'div'> = {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  y?: number
  x?: number
  duration?: number
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'delay' | 'stagger' | 'y' | 'x' | 'duration'>

export default function ScrollReveal<T extends ElementType = 'div'>({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  y = 30,
  x = 0,
  duration = 0.6,
  as,
  ...rest
}: ScrollRevealProps<T>) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag = as || 'div'

  useGSAP(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.reveal-item')
    const targets = items.length > 0 ? items : [ref.current]

    gsap.fromTo(
      targets,
      { opacity: 0, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, { scope: ref })

  const Component = Tag as ElementType
  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  )
}
