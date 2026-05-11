import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger)

export interface LightboxImage {
  src: string
  title: string
  category: string
}

export interface LightboxContextType {
  openLightbox: (images: LightboxImage[], startIndex: number) => void
  closeLightbox: () => void
}

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 1.2,
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname])

  const openLightbox = (images: LightboxImage[], startIndex: number) => {
    setLightboxImages(images)
    setLightboxIndex(startIndex)
    setLightboxOpen(true)
    if (lenisRef.current) {
      lenisRef.current.stop()
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    if (lenisRef.current) {
      lenisRef.current.start()
    }
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navigation lenis={lenisRef.current} />
      <div ref={pageRef} key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home openLightbox={openLightbox} />} />
          <Route path="/portfolio" element={<Portfolio openLightbox={openLightbox} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </div>
  )
}

export default App
