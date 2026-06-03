import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import GrainOverlay from './components/GrainOverlay'
import Intro        from './components/Intro'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import Members      from './components/Members'
import Programs     from './components/Programs'
import Membership   from './components/Membership'
import TheFloor     from './components/TheFloor'
import EnterCTA     from './components/EnterCTA'
import Footer       from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  // Lenis: one RAF loop total, driven entirely by GSAP ticker
  useEffect(() => {
    if (!introDone) return

    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: false,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const rafFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(rafFn)
      lenis.destroy()
    }
  }, [introDone])

  return (
    <>
      <GrainOverlay />
      <Intro onDone={() => setIntroDone(true)} />
      <Nav />
      <main>
        <Hero />
        <Members />
        <Programs />
        <Membership />
        <TheFloor />
        <EnterCTA />
      </main>
      <Footer />
    </>
  )
}
