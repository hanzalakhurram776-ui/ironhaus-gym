import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const WORDS = ['STRENGTH.', 'DISCIPLINE.', 'IDENTITY.']

export default function Intro({ onDone }) {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    document.body.classList.add('locked')
    window.scrollTo(0, 0)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set('#hero-c',    { opacity: 0, y: 28 })
    gsap.set('#scroll-ind', { opacity: 0 })
    gsap.set('.ws-word',   { opacity: 0, scale: 1.4 })

    const finish = () => {
      const overlay = document.getElementById('intro-overlay')
      if (overlay) overlay.style.display = 'none'
      // Clear will-change now that panels are gone
      const pl = document.getElementById('panel-l')
      const pr = document.getElementById('panel-r')
      if (pl) pl.style.willChange = 'auto'
      if (pr) pr.style.willChange = 'auto'
      document.body.classList.remove('locked')
      ScrollTrigger.refresh()
      onDone()
    }

    if (prefersReduced) {
      gsap.set('#hero-c',   { opacity: 1, y: 0 })
      gsap.set('#scroll-ind', { opacity: 1 })
      finish()
      return
    }

    const tl = gsap.timeline({ delay: 0.15, onComplete: finish })

    // Phase 1 — IRONHAUS + red line
    tl.to('#intro-logo', { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0)
    tl.to('#intro-line', { scaleX: 1, duration: 0.75, ease: 'power2.inOut' }, 0.35)

    // Phase 2 — Door opens (panels split)
    tl.call(() => {
      const pl = document.getElementById('panel-l')
      const pr = document.getElementById('panel-r')
      if (pl) pl.style.willChange = 'transform'
      if (pr) pr.style.willChange = 'transform'
    }, null, 1.0)
    // Subtle screen shake as the door swings
    tl.call(() => {
      gsap.to(document.body, { x: 4, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' })
    }, null, 1.05)
    tl.to('#panel-l', { x: '-100%', duration: 2.0, ease: 'power3.inOut' }, 1.05)
    tl.to('#panel-r', { x: '100%',  duration: 2.0, ease: 'power3.inOut' }, 1.05)
    // Logo + line fade as panels open
    tl.to('#intro-logo', { opacity: 0, duration: 0.38 }, 1.32)
    tl.to('#intro-line',  { opacity: 0, duration: 0.38 }, 1.32)

    // Phase 3 — STRENGTH / DISCIPLINE / IDENTITY (automatic, not scroll)
    // Panels finish at t = 1.05 + 2.0 = 3.05
    tl.to('#ws-w1', { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }, 3.1)
    tl.to('#ws-w2', { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }, 3.9)   // +0.8 stagger
    tl.to('#ws-w3', { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }, 4.7)   // +0.8 stagger
    // IDENTITY finishes at 5.2 — hold 1.5 seconds
    tl.to({}, { duration: 1.5 }, 5.2)

    // Phase 4 — Fade out entire overlay, reveal hero
    tl.to('#intro-overlay', { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 6.7)
    tl.to('#hero-c',    { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, 6.7)
    tl.to('#scroll-ind', { opacity: 1, duration: 0.6 }, 7.1)

    return () => { tl.kill() }
  }, [onDone])

  return (
    <div id="intro-overlay" style={{ position: 'fixed', inset: 0, zIndex: 5000 }}>

      {/* Background: about.jpg — the "work" atmosphere for the word sequence */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <img
          src="/images/about.jpg"
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 20%',
            filter: 'grayscale(60%) brightness(0.28) contrast(1.1)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      </div>

      {/* Left panel */}
      <div id="panel-l" style={{
        position: 'absolute', top: 0, left: 0,
        height: '100%', width: '50.2%',
        background: '#0A0A0A', zIndex: 3,
      }} />

      {/* Right panel */}
      <div id="panel-r" style={{
        position: 'absolute', top: 0, right: 0,
        height: '100%', width: '50.2%',
        background: '#0A0A0A', zIndex: 3,
      }} />

      {/* IRONHAUS + expanding line (fades out as panels open) */}
      <div id="intro-c" style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 20, pointerEvents: 'none',
      }}>
        <div
          id="intro-logo"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            letterSpacing: '0.15em',
            color: '#F0EDE8',
            opacity: 0,
            lineHeight: 1,
          }}
        >
          IRONHAUS
        </div>
        <div style={{ width: 'min(62vw, 580px)', height: 1, overflow: 'hidden' }}>
          <div
            id="intro-line"
            style={{
              width: '100%', height: 1,
              background: '#8B0000',
              transform: 'scaleX(0)',
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

      {/* Word sequence — appears after panels open */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        {WORDS.map((word, i) => (
          <div
            key={word}
            id={`ws-w${i + 1}`}
            className="ws-word"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(3.5rem, 15vw, 13rem)',
              letterSpacing: '0.04em',
              color: '#F0EDE8',
              lineHeight: 0.9,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            {word}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ws-word { font-size: clamp(2.8rem, 16vw, 5rem) !important; }
        }
      `}</style>
    </div>
  )
}
