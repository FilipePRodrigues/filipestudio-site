import { Benefits } from './components/Benefits.tsx'
import { Contact } from './components/Contact.tsx'
import { FAQ } from './components/FAQ.tsx'
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { Navbar } from './components/Navbar.tsx'
import { Portfolio } from './components/Portfolio.tsx'
import { Pricing } from './components/Pricing.tsx'
import { Process } from './components/Process.tsx'
import { Services } from './components/Services.tsx'
import { TechStrip } from './components/TechStrip.tsx'
import { Testimonials } from './components/Testimonials.tsx'
import { useScrollReveal } from './hooks/useScrollReveal.ts'
import { useTheme } from './hooks/useTheme.ts'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useScrollReveal()

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="conteudo">
        <Hero />
        <TechStrip />
        <Services />
        <Benefits />
        <Process />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
