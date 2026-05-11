import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking wedding photography 12–18 months in advance. For portrait and commercial sessions, 4–6 weeks is usually sufficient.',
  },
  {
    question: 'Do you travel for shoots?',
    answer:
      'Absolutely. While we\'re based in London, we regularly travel across the UK and internationally for weddings and commercial projects. Travel costs are quoted separately.',
  },
  {
    question: 'What\'s included in the edited images?',
    answer:
      'All delivered images are professionally edited for color, contrast, and exposure. Skin retouching and advanced compositing are available as add-ons.',
  },
  {
    question: 'How long until I receive my photos?',
    answer:
      'Portrait sessions: 2 weeks. Weddings: 6–8 weeks. Commercial projects: 1–2 weeks depending on scope. Rush delivery is available.',
  },
  {
    question: 'Can I request specific shots or styles?',
    answer:
      'Of course! We encourage clients to share inspiration and must-have shots. Our pre-shoot consultation ensures we\'re aligned on your vision.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.faq-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
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
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="accent-text text-gold">COMMON QUESTIONS</span>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item bg-white/[0.03] rounded-sm border-b border-white/[0.08] opacity-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="body-large text-white pr-8">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-white/60 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? '200px' : '0',
                }}
              >
                <p className="body-large text-white/70 px-6 pb-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
