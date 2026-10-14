import { useEffect, useState } from 'react'
import { BlogIndex } from './components/blog/BlogIndex.tsx'
import { BlogPostNotFound, BlogPostView } from './components/blog/BlogPostView.tsx'
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
import { getBlogPost, getBlogPosts } from './lib/blog.ts'

type Route =
  | { name: 'home'; section: string }
  | { name: 'blog' }
  | { name: 'post'; slug: string }

function parseRoute(hash: string): Route {
  const clean = hash.replace(/^#/, '')

  if (clean === '/blog' || clean === '/blog/') {
    return { name: 'blog' }
  }

  if (clean.startsWith('/blog/')) {
    return { name: 'post', slug: decodeURIComponent(clean.slice('/blog/'.length)) }
  }

  return { name: 'home', section: clean }
}

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

function Landing({ section }: { section: string }) {
  useEffect(() => {
    if (!section) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [section])

  return (
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
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useScrollReveal()
  const route = useHashRoute()

  useEffect(() => {
    if (route.name !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [route])

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {route.name === 'home' ? <Landing section={route.section} /> : null}

      {route.name === 'blog' ? (
        <main id="conteudo">
          <BlogIndex posts={getBlogPosts()} />
        </main>
      ) : null}

      {route.name === 'post' ? (
        <main id="conteudo">
          {(() => {
            const post = getBlogPost(route.slug)
            return post ? <BlogPostView post={post} /> : <BlogPostNotFound slug={route.slug} />
          })()}
        </main>
      ) : null}

      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
