import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const images = [
  { src: '/images/strength.jpg', alt: 'Gym Equipment'  },
  { src: '/images/about.jpg',    alt: 'Training'        },
  { src: '/images/combat.jpg',   alt: 'Combat Training' },
  { src: '/images/hiit.jpg',     alt: 'HIIT Floor'      },
]

export default function TheFloor() {
  const sectionRef = useRef(null)
  const stripRef   = useRef(null)

  useGSAP(() => {
    const strip = stripRef.current
    if (!strip) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const mm = gsap.matchMedia()

    // Desktop: the ONE allowed scroll-pinned section
    mm.add('(min-width: 769px)', () => {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + (strip.scrollWidth - window.innerWidth),
          pin: true,
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
    })

    // Mobile: no pin, no JS animation — pure CSS overflow-x scroll
    mm.add('(max-width: 768px)', () => {
      // Nothing — CSS handles it
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="floor"
      className="floor-section"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      <div
        ref={stripRef}
        id="floor-strip"
        style={{ display: 'flex', height: '100%', willChange: 'transform' }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="fi"
            style={{
              flex: '0 0 38vw',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: '#0A0A0A',
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="eager"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(35%) brightness(0.6)',
                pointerEvents: 'none',
                display: 'block',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
          </div>
        ))}
      </div>

      <style>{`
        /* Mobile: no JS pin, native CSS horizontal scroll */
        @media (max-width: 768px) {
          .floor-section {
            height: auto !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
          }
          #floor-strip {
            width: max-content;
            height: 56vw !important;
            will-change: auto !important;
          }
          .fi {
            flex: 0 0 78vw !important;
            height: 56vw !important;
          }
        }
      `}</style>
    </section>
  )
}
