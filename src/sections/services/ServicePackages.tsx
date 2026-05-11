import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    name: 'Portrait Photography',
    description:
      'From professional headshots to creative editorial portraits, we bring out your authentic self. Our studio in Shoreditch offers a relaxed environment where great images happen naturally.',
    features: [
      'Studio & on-location',
      'Professional lighting setup',
      '20+ edited images',
      'Online gallery',
      '2-hour session',
    ],
    price: 'From £350',
    image: '/assets/service-portrait.jpg',
  },
  {
    number: '02',
    name: 'Wedding Photography',
    description:
      'Your wedding day deserves to be remembered in all its beauty. We document the laughter, tears, and everything in between — creating a visual narrative you\'ll treasure forever.',
    features: [
      'Full day coverage',
      'Two photographers',
      '500+ edited images',
      'Luxury album option',
      'Engagement session included',
    ],
    price: 'From £2,400',
    image: '/assets/service-wedding.jpg',
  },
  {
    number: '03',
    name: 'Commercial Photography',
    description:
      'Elevate your brand with imagery that commands attention. From product shots to full campaigns, we create visuals that drive engagement and sales.',
    features: [
      'Product & lifestyle shots',
      'Brand-consistent editing',
      'Usage rights included',
      'Rush delivery available',
      'Studio or on-location',
    ],
    price: 'From £600',
    image: '/assets/service-commercial.jpg',
  },
  {
    number: '04',
    name: 'Photo Editing & Retouching',
    description:
      'Already have images that need polish? Our expert retouchers enhance color, remove distractions, and ensure every pixel is perfect.',
    features: [
      'Color grading & correction',
      'Skin retouching',
      'Background cleanup',
      'Object removal',
      'Batch processing',
    ],
    price: 'From £50/hour',
    image: '/assets/service-editing.jpg',
  },
]

export default function ServicePackages() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const rows = sectionRef.current.querySelectorAll('.service-row')
    rows.forEach((row) => {
      const image = row.querySelector('.service-image')
      const textEls = row.querySelectorAll('.service-text-anim')
      const isEven = row.classList.contains('service-even')

      if (image) {
        gsap.fromTo(
          image,
          { opacity: 0, x: isEven ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: row,
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
            delay: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    })
  }, { scope: sectionRef })

  return (
    <div ref={sectionRef}>
      {services.map((service, i) => {
        const isEven = i % 2 !== 0
        const isWarm = isEven

        return (
          <div
            key={i}
            className={`service-row ${isEven ? 'service-even' : ''} ${
              isWarm ? 'bg-cream' : 'bg-dark'
            } flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 py-16 md:py-24 px-6`}
          >
            {/* Image */}
            <div className="w-full md:w-[55%] overflow-hidden rounded-sm">
              <img
                src={service.image}
                alt={service.name}
                className="service-image w-full aspect-[3/2] object-cover hover:scale-[1.03] transition-transform duration-300 transition-secondary opacity-0"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-[45%] max-w-[1400px] mx-auto">
              <span
                className={`service-text-anim heading-xxl opacity-30 block ${
                  isWarm ? 'text-gold' : 'text-gold'
                } opacity-0`}
              >
                {service.number}
              </span>
              <h3
                className={`service-text-anim heading-xl mt-4 ${
                  isWarm ? 'text-text-dark' : 'text-white'
                } opacity-0`}
              >
                {service.name}
              </h3>
              <p
                className={`service-text-anim body-large mt-6 opacity-70 ${
                  isWarm ? 'text-text-dark' : 'text-white'
                } opacity-0`}
              >
                {service.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3">
                {service.features.map((feature, j) => (
                  <li
                    key={j}
                    className={`service-text-anim flex items-center gap-3 ${
                      isWarm ? 'text-text-dark/80' : 'text-white/80'
                    } opacity-0`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="body-large">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="service-text-anim heading-l text-gold mt-8 opacity-0">
                {service.price}
              </p>

              <Link
                to="/contact"
                className={`service-text-anim inline-block mt-8 accent-text px-8 py-3 rounded-sm transition-colors duration-300 opacity-0 ${
                  isWarm
                    ? 'bg-dark text-white hover:bg-charcoal'
                    : 'bg-gold text-dark hover:bg-gold-light'
                }`}
              >
                Book This Service
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
