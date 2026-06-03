import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function EnterCTA() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.cta-w', {
      opacity: 0, y: 30, duration: 1.3, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })
    gsap.from(['.cta-rule', '.cta-line', '.cta-btn'], {
      opacity: 0, y: 20, stagger: 0.14, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        background: '#000',
        padding: '17vh 8vw',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 22,
      }}
    >
      <h2 className="cta-w" style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: 'clamp(8rem, 20vw, 18rem)',
        letterSpacing: '0.04em',
        color: '#F0EDE8',
        lineHeight: 0.86,
      }}>
        ENTER.
      </h2>

      <div className="cta-rule" style={{ width: 60, height: 1, background: '#8B0000' }} />

      <p className="cta-line" style={{
        fontSize: 12, fontWeight: 300,
        color: 'rgba(240,237,232,0.26)',
        letterSpacing: '0.12em',
      }}>
        The house is open. Are you ready?
      </p>

      <button
        className="cta-btn"
        style={{
          marginTop: 6,
          padding: '15px 58px',
          whiteSpace: 'nowrap',
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 14, letterSpacing: '0.22em',
          border: '1px solid #8B0000',
          background: 'transparent',
          color: 'rgba(240,237,232,0.55)',
          transition: 'all 0.45s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#8B0000'
          e.currentTarget.style.color = '#000'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'rgba(240,237,232,0.55)'
        }}
      >
        JOIN IRONHAUS
      </button>

      <style>{`
        @media (max-width: 768px) {
          #cta { padding: 12vh 24px !important; }
        }
      `}</style>
    </section>
  )
}
