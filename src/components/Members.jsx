import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const members = [
  {
    img: '/images/coach-1.jpg',
    title: 'THE BEGINNER',
    text: "Someone who just decided. Doesn’t know how yet. But decided. That’s enough to walk through the door.",
  },
  {
    img: '/images/coach-2.jpg',
    title: 'THE ATHLETE',
    text: "Has been here. Knows every corner. This is their second home.",
  },
  {
    img: '/images/coach-3.jpg',
    title: 'THE VETERAN',
    text: "Has nothing to prove. Comes in anyway. Every single day.",
  },
]

export default function Members() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.members-sh', {
      opacity: 0, y: 28, duration: 0.85, ease: 'power2.out',
      scrollTrigger: {
        trigger: '.members-sh', start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
    gsap.from('.mc', {
      y: 30, opacity: 0, stagger: 0.16, duration: 1.0, ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="members"
      style={{ background: '#111111', padding: '108px 8vw 96px' }}
    >
      <div style={{ marginBottom: 64 }}>
        <h2 className="members-sh" style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          letterSpacing: '0.06em',
          color: '#F0EDE8',
          lineHeight: 1,
          marginBottom: 14,
        }}>
          THE MEMBERS
        </h2>
        <div style={{ width: 40, height: 1, background: '#8B0000' }} />
      </div>

      <div className="mem-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {members.map((m, i) => (
          <div
            key={i}
            className="mc"
            style={{
              position: 'relative',
              border: '1px solid transparent',
              transition: 'border-color 0.5s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B0000')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <div style={{ aspectRatio: '2/3', overflow: 'hidden', position: 'relative' }}>
              <img
                src={m.img}
                alt={m.title}
                loading="lazy"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center 20%',
                  filter: 'grayscale(25%) brightness(0.62)',
                  transition: 'transform 0.9s ease, filter 0.6s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)'
                  e.currentTarget.style.filter = 'grayscale(10%) brightness(0.72)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.filter = 'grayscale(25%) brightness(0.62)'
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
                background: 'linear-gradient(to top, rgba(17,17,17,0.97) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
            </div>
            <div style={{ padding: '22px 24px 28px', background: '#111111' }}>
              <h3 style={{
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
                letterSpacing: '0.06em',
                color: '#F0EDE8',
                marginBottom: 10,
              }}>
                {m.title}
              </h3>
              <p style={{
                fontSize: 12, fontWeight: 300,
                color: 'rgba(240,237,232,0.36)',
                lineHeight: 1.85, letterSpacing: '0.02em',
              }}>
                {m.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mem-grid { grid-template-columns: 1fr !important; }
          #members { padding: 72px 24px 64px !important; }
        }
      `}</style>
    </section>
  )
}
