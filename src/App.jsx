import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WaveDivider from './components/WaveDivider'

export default function App() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          {/* Hero (white-ish) → About (white) — subtle wave */}
          <About />
          {/* About (white) → Skills (dark slate-900) */}
          <WaveDivider bg="white" fill="#0f172a" />
          <Skills />
          {/* Skills wave-out already inside Skills component */}
          <Projects />
          <Experience />
          <Education />
          {/* Education (white) → Contact (dark slate-900) */}
          <WaveDivider bg="white" fill="#0f172a" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
