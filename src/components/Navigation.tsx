import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'
import type Lenis from 'lenis'

interface NavigationProps {
  lenis: Lenis | null
}

const navLinks = [
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/#philosophy' },
  { label: 'Contact', path: '/contact' },
]

export default function Navigation({ lenis }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    if (lenis) lenis.start()
  }, [location.pathname, lenis])

  useEffect(() => {
    if (mobileOpen && mobileNavRef.current && linksRef.current) {
      const links = linksRef.current.querySelectorAll('.mobile-link')
      gsap.fromTo(
        links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power4.out' }
      )
      if (lenis) lenis.stop()
    } else if (!mobileOpen && lenis) {
      lenis.start()
    }
  }, [mobileOpen, lenis])

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '')
      if (location.pathname === '/') {
        e.preventDefault()
        const el = document.getElementById(id)
        if (el && lenis) {
          lenis.scrollTo(el, { offset: -72 })
        }
      }
    }
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-dark/95 border-b border-white/[0.08] backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="accent-text text-white tracking-[0.08em] hover:text-gold transition-colors duration-300"
          >
            PIXEL ART STUDIO
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`accent-text relative group ${
                  (link.path === '/portfolio' && location.pathname === '/portfolio') ||
                  (link.path === '/services' && location.pathname === '/services') ||
                  (link.path === '/contact' && location.pathname === '/contact')
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                } transition-colors duration-300`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-[6px] h-[1px] bg-white transition-all duration-500 transition-primary ${
                    (link.path === '/portfolio' && location.pathname === '/portfolio') ||
                    (link.path === '/services' && location.pathname === '/services') ||
                    (link.path === '/contact' && location.pathname === '/contact')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className="accent-text border border-white text-white px-5 py-2 rounded-sm hover:bg-white hover:text-dark transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          ref={mobileNavRef}
          className="fixed inset-0 z-40 bg-dark flex flex-col items-center justify-center gap-8"
        >
          <div ref={linksRef} className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="mobile-link heading-xl text-white hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mobile-link accent-text border border-white text-white px-8 py-3 rounded-sm hover:bg-white hover:text-dark transition-all duration-300 mt-4"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
