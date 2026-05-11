import { useEffect, useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { LightboxImage } from '../App'

interface LightboxProps {
  isOpen: boolean
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, goNext, goPrev])

  useEffect(() => {
    if (!overlayRef.current) return
    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
    }
  }, [isOpen])

  useEffect(() => {
    if (!imageRef.current || !isOpen) return
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power4.out' }
    )
  }, [currentIndex, isOpen])

  if (!isOpen || images.length === 0) return null

  const current = images[currentIndex]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gold transition-colors duration-300 z-10"
        aria-label="Close lightbox"
      >
        <X size={48} strokeWidth={1} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imageRef}
          src={current.src}
          alt={current.title}
          className="max-w-full max-h-[75vh] object-contain"
        />
        <div className="mt-6 text-center">
          <span className="accent-text text-gold block">{current.category}</span>
          <span className="body-small text-white/70 mt-1 block">{current.title}</span>
        </div>
      </div>
    </div>
  )
}
