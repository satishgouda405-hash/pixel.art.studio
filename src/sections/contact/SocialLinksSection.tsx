import ScrollReveal from '../../components/ScrollReveal'

const socials = [
  { name: 'Instagram', followers: '24.5K' },
  { name: 'Pinterest', followers: '12.1K' },
  { name: 'LinkedIn', followers: '3.8K' },
]

export default function SocialLinksSection() {
  return (
    <ScrollReveal className="bg-dark py-20 px-6">
      <div className="max-w-[1400px] mx-auto text-center">
        <span className="accent-text text-gold block mb-10">FOLLOW OUR WORK</span>
        <div className="flex justify-center gap-10 md:gap-10 flex-wrap">
          {socials.map((social) => (
            <div key={social.name} className="text-center">
              <span className="body-large text-white hover:text-gold transition-colors duration-300 cursor-pointer">
                {social.name}
              </span>
              <p className="body-small text-white/40 mt-2">{social.followers} followers</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
