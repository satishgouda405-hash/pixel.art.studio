import PageHero from '../components/PageHero'
import ContactFormSection from '../sections/contact/ContactFormSection'
import SocialLinksSection from '../sections/contact/SocialLinksSection'

export default function Contact() {
  return (
    <main>
      <PageHero
        title="CONTACT"
        subtitle="Let's start a conversation about your next project."
      />
      <ContactFormSection />
      <SocialLinksSection />
    </main>
  )
}
