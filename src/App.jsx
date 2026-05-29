import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './App.css'
import { tokens } from './tokens'
import { CustomCursor } from './components/CustomCursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Training } from './components/Training'
import { Coaches } from './components/Coaches'
import { Pricing } from './components/Pricing'
import { Join } from './components/Join'
import { Footer } from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ backgroundColor: tokens.colors.background, fontFamily: tokens.fonts.body }}>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Training />
        <Coaches />
        <Pricing />
        <Join />
      </main>
      <Footer />
    </div>
  )
}

export default App
