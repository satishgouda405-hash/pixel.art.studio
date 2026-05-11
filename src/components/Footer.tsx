import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!footerRef.current) return
    const cols = footerRef.current.querySelectorAll('.footer-col')
    gsap.fromTo(
      cols,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="bg-dark py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="footer-col">
            <span className="accent-text text-white tracking-[0.08em]">
              PIXEL ART STUDIO
            </span>
          </div>

          {/* Navigation */}
          <div className="footer-col flex flex-col gap-3">
            <Link
              to="/portfolio"
              className="body-small text-white/60 hover:text-white transition-colors duration-300"
            >
              Portfolio
            </Link>
            <Link
              to="/services"
              className="body-small text-white/60 hover:text-white transition-colors duration-300"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="body-small text-white/60 hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Services */}
          <div className="footer-col flex flex-col gap-3">
            <span className="body-small text-white/60">Portrait</span>
            <span className="body-small text-white/60">Wedding</span>
            <span className="body-small text-white/60">Commercial</span>
            <span className="body-small text-white/60">Editing</span>
          </div>

          {/* Contact */}
          <div className="footer-col flex flex-col gap-3">
            <span className="body-small text-white/60">
              hello@pixelartstudio.co.uk
            </span>
            <span className="body-small text-white/60">+44 20 7946 0958</span>
            <span className="body-small text-white/60">
              12 Shoreditch High St, London E1 6JE
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="body-small text-white/40">
            © 2025 Pixel Art Studio. All rights reserved.
          </span>
          <div className="flex gap-6">
            <span className="body-small text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
              Instagram
            </span>
            <span className="body-small text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
              Pinterest
            </span>
            <span className="body-small text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
              LinkedIn
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
