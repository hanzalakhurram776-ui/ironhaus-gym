import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const words = [
  { id: 'w1', flashId: 'wf1', text: 'STRENGTH.'   },
  { id: 'w2', flashId: 'wf2', text: 'DISCIPLINE.' },
  { id: 'w3', flashId: 'wf3', text: 'IDENTITY.'   },
]

export default function TheWork() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Set initial states
    gsap.set(['.ww'], { opacity: 0, scale: 1.3 })
    gsap.set(['.wf'], { opacity: 0 })
    gsap.set(['#wsub'], { opacity: 0, y: 8 })

    if (prefersReduced) {
      gsap.set('.ww', { opacity: 1, scale: 1 })
      gsap.set('#wsub', { opacity: 1, y: 0 })
      return
    }

    const wTl = gsap.timeline()

    // Background deblurs as scroll progresses
    wTl.fromTo('#work-bg-img',
      { filter: 'blur(8px) brightness(0.22)', scale: 1.14 },
      { filter: 'blur(0px) brightness(0.36)', scale: 1.06, ease: 'none', duration: 1.4 },
      0
    )

    // STRENGTH
    wTl.fromTo('#w1', { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.out' }, 1.0)
    wTl.fromTo('#wf1', { opacity: 0.55 }, { opacity: 0, duration: 0.38 }, 1.0)

    // DISCIPLINE
    wTl.fromTo('#w2', { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.out' }, 2.1)
    wTl.fromTo('#wf2', { opacity: 0.55 }, { opacity: 0, duration: 0.38 }, 2.1)

    // IDENTITY
    wTl.fromTo('#w3', { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.out' }, 3.2)
    wTl.fromTo('#wf3', { opacity: 0.55 }, { opacity: 0, duration: 0.38 }, 3.2)

    // Subtitle
    wTl.fromTo('#wsub', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, 3.9)

    // Hold before unpin
    wTl.to({}, { duration: 0.9 }, 4.3)

    ScrollTrigger.create({
      animation: wTl,
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=340%',
      pin: true,
      pinSpacing: true,
      scrub: 0.85,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Background image — deblurs on scroll */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          id="work-bg-img"
          src="/images/about.jpg"
          alt=""
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 20%',
            filter: 'blur(8px) brightness(0.22)',
            transform: 'scale(1.14)',
            willChange: 'filter, transform',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1 }} />
      </div>

      {/* Words */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          width: '100%', padding: '0 4vw',
        }}
      >
        {words.map(({ id, flashId, text }) => (
          <div
            key={id}
            id={id}
            className="ww"
            style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(3.5rem, 15vw, 13rem)',
              letterSpacing: '0.04em',
              color: '#F0EDE8',
              lineHeight: 0.9,
              position: 'relative',
              display: 'inline-block',
              willChange: 'transform, opacity',
            }}
          >
            <div
              id={flashId}
              className="wf"
              style={{
                position: 'absolute',
                inset: '-6px -24px',
                background: '#6B0000',
                zIndex: -1,
              }}
            />
            {text}
          </div>
        ))}

        <p
          id="wsub"
          style={{
            marginTop: 44,
            fontSize: 12, fontWeight: 300,
            letterSpacing: '0.14em',
            color: 'rgba(240,237,232,0.28)',
          }}
        >
          This is what you came for.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ww { font-size: clamp(2.8rem, 16vw, 5rem) !important; }
        }
      `}</style>
    </section>
  )
}
