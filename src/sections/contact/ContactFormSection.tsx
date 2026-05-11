import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactFormSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const form = sectionRef.current.querySelector('.contact-form')
    const info = sectionRef.current.querySelector('.contact-info')

    if (form) {
      gsap.fromTo(
        form,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    if (info) {
      gsap.fromTo(
        info,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const inputClass =
    'w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-4 outline-none focus:border-gold transition-colors duration-300 body-large'

  return (
    <div
      ref={sectionRef}
      className="bg-dark min-h-[80vh] py-[120px] md:py-[120px] px-6"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-20">
        {/* Form - 55% */}
        <div className="contact-form w-full md:w-[55%] opacity-0">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="heading-l text-white text-center">Message Sent</h3>
              <p className="body-large text-white/60 text-center mt-4">
                Thank you for reaching out. We'll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="accent-text text-white/60 block mb-2">NAME</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="accent-text text-white/60 block mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="accent-text text-white/60 block mb-2">
                  PHONE <span className="text-white/30">(OPTIONAL)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+44 0000 000000"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="accent-text text-white/60 block mb-2">SERVICE TYPE</label>
                <select
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D4AF37' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                  }}
                  required
                >
                  <option value="" disabled className="bg-charcoal text-white">
                    Select a service
                  </option>
                  <option value="portrait" className="bg-charcoal text-white">
                    Portrait Photography
                  </option>
                  <option value="wedding" className="bg-charcoal text-white">
                    Wedding Photography
                  </option>
                  <option value="commercial" className="bg-charcoal text-white">
                    Commercial Photography
                  </option>
                  <option value="editing" className="bg-charcoal text-white">
                    Photo Editing & Retouching
                  </option>
                </select>
              </div>

              <div>
                <label className="accent-text text-white/60 block mb-2">MESSAGE</label>
                <textarea
                  placeholder="Tell us about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full accent-text bg-gold text-dark py-4 rounded-sm hover:bg-gold-light transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Info Card + Map - 45% */}
        <div className="contact-info w-full md:w-[45%] opacity-0">
          {/* Info Card */}
          <div className="bg-charcoal p-8 md:p-12 rounded-sm">
            <span className="accent-text text-gold">VISIT THE STUDIO</span>
            <p className="body-large text-white mt-4">
              12 Shoreditch High Street, London E1 6JE, United Kingdom
            </p>
            <p className="body-large text-gold mt-6">hello@pixelartstudio.co.uk</p>
            <p className="body-large text-white/70 mt-3">+44 20 7946 0958</p>

            <div className="mt-8">
              <p className="body-small text-white/50">Opening Hours</p>
              <p className="body-small text-white/70 mt-2">Mon–Fri: 9:00 – 18:00</p>
              <p className="body-small text-white/70 mt-1">
                Sat: 10:00 – 16:00 (by appointment)
              </p>
              <p className="body-small text-white/70 mt-1">Sun: Closed</p>
            </div>
          </div>

          {/* Map */}
          <div className="mt-6 aspect-video rounded-sm overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5!2d-0.0786!3d51.5234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cb1671b65c1%3A0x33702dd1dea93aa5!2sShoreditch%20High%20St%2C%20London!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio location"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
