import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // Disable parallax on mobile — transform/opacity only, never positional on low-end devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.to('#hero-bg img', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div id="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/images/hero-bg.jpg"
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            filter: 'grayscale(80%) brightness(0.32) contrast(1.15)',
            transform: 'scale(1.06)',
            willChange: 'transform',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
      </div>

      {/* Content — opacity 0, revealed by Intro timeline */}
      <div
        id="hero-c"
        style={{
          position: 'relative', zIndex: 10,
          padding: '0 8vw',
          willChange: 'transform, opacity',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: 9, fontWeight: 300,
          textTransform: 'uppercase', letterSpacing: '0.35em',
          color: '#8B0000', marginBottom: 24,
        }}>
          EST. 2019 &middot; LAHORE
        </span>
        <h1 style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 'clamp(5rem, 12vw, 11rem)',
          letterSpacing: '0.04em',
          color: '#F0EDE8',
          lineHeight: 0.9,
          marginBottom: 28,
        }}>
          THE HOUSE<br />OF IRON.
        </h1>
        <p style={{
          fontSize: 13, fontWeight: 300,
          color: 'rgba(240,237,232,0.36)',
          letterSpacing: '0.06em',
        }}>
          Where the decision was already made.
        </p>
      </div>

      {/* Scroll indicator — bottom right, revealed by Intro */}
      <div
        id="scroll-ind"
        style={{
          position: 'absolute', bottom: 40, right: 48,
          zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <div style={{
          width: 1, height: 58,
          background: 'rgba(240,237,232,0.1)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -12, left: 0,
            width: 1, height: 12,
            background: '#8B0000',
            animation: 'pip 2.2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pip {
          0%   { top: -12px; opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @media (max-width: 768px) {
          #hero-c     { padding: 0 24px !important; }
          #scroll-ind { right: 20px !important; bottom: 24px !important; }
          /* No parallax on mobile — release the GPU layer */
          #hero-bg img { will-change: auto !important; }
        }
      `}</style>
    </section>
  )
}
