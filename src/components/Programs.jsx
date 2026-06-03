import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const programs = [
  { num: '01', name: 'STRENGTH TRAINING', tag: "Iron doesn't lie. Neither do your numbers." },
  { num: '02', name: 'CONDITIONING',       tag: "Your lungs will hate you. Your body won't." },
  { num: '03', name: 'PERSONAL TRAINING',  tag: "One coach. One plan. No excuses." },
  { num: '04', name: 'OPEN FLOOR',         tag: "The house is yours. Use it." },
]

export default function Programs() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.programs-sh', {
      opacity: 0, y: 30, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: '.programs-sh', start: 'top 80%' },
    })
    // opacity + y only — no scale, no rotation
    gsap.from('.pc', {
      opacity: 0, y: 30, stagger: 0.12, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="programs"
      style={{ background: '#0A0A0A', padding: '108px 8vw 96px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 className="programs-sh" style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          letterSpacing: '0.06em',
          color: '#F0EDE8',
          lineHeight: 1, marginBottom: 14,
        }}>
          WHAT WE BUILD
        </h2>
        <div style={{ width: 40, height: 1, background: '#8B0000', margin: '0 auto' }} />
      </div>

      <div className="prog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {programs.map((p, i) => (
          <div
            key={i}
            className="pc"
            style={{
              background: '#131313',
              padding: '48px 44px 44px',
              position: 'relative', overflow: 'hidden',
              transition: 'background 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#161616'
              const line = e.currentTarget.querySelector('.pc-line')
              if (line) line.style.transform = 'scaleX(1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#131313'
              const line = e.currentTarget.querySelector('.pc-line')
              if (line) line.style.transform = 'scaleX(0)'
            }}
          >
            {/* Red border grows from left on hover — scaleX transform only, no layout reflow */}
            <div className="pc-line" style={{
              position: 'absolute', bottom: 0, left: 0,
              height: 1, width: '100%',
              background: '#8B0000',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.6s ease',
            }} />
            <div style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(2.8rem, 4vw, 4.5rem)',
              color: 'rgba(139,0,0,0.32)',
              lineHeight: 1, marginBottom: 20,
            }}>
              {p.num}
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', 'Impact', sans-serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
              letterSpacing: '0.05em',
              color: '#F0EDE8', marginBottom: 14,
            }}>
              {p.name}
            </div>
            <p style={{
              fontSize: 12, fontWeight: 300,
              color: 'rgba(240,237,232,0.3)',
              letterSpacing: '0.04em', lineHeight: 1.75,
            }}>
              {p.tag}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .prog-grid { grid-template-columns: 1fr !important; }
          #programs  { padding: 72px 24px 64px !important; }
        }
      `}</style>
    </section>
  )
}
