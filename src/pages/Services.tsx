import PageHero from '../components/PageHero'
import ServicePackages from '../sections/services/ServicePackages'
import FAQSection from '../sections/services/FAQSection'

export default function Services() {
  return (
    <main>
      <PageHero
        title="SERVICES"
        subtitle="Comprehensive visual solutions tailored to your needs."
      />
      <ServicePackages />
      <FAQSection />
    </main>
  )
}
