import { useMemo } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Experience } from '../components/Experience'
import { GitHubStats } from '../components/GitHubStats'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { CustomCursor } from '../components/CustomCursor'
import { PageLoader } from '../components/PageLoader'
import { ScrollProgress } from '../components/ScrollProgress'
import { Seo } from '../components/Seo'
import { NAV, SITE } from '../data/siteData'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'

export default function Home() {
  const { theme, toggle } = useTheme()
  const sectionIds = useMemo(() => NAV.map((n) => n.id), [])
  const active = useActiveSection(sectionIds)

  return (
    <div className="min-h-screen">
      <Seo
        title={`${SITE.name} — ${SITE.role}`}
        description={SITE.tagline}
      />
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />

      <Navbar active={active} theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubStats />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

