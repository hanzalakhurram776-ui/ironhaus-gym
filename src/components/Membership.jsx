import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const tiers = [
  {
    id: 'iron',
    name: 'IRON',
    price: 'PKR 5,000',
    features: ['Open floor access', 'Locker room', '6 days / week'],
    borderColor: '#2A2A2A',
    shadow: 'none',
  },
  {
    id: 'forge',
    name: 'FORGE',
    price: 'PKR 9,000',
    most: true,
    features: ['Everything in IRON', 'Personal program', '1 PT session / month'],
    borderColor: '#8B0000',
    shadow: '0 0 60px rgba(139,0,0,0.12)',
    priceRed: true,
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: 'PKR 15,000',
    features: ['Everything in FORGE', 'Unlimited PT', 'Nutrition plan', 'Priority access'],
    borderColor: '#3A3A3A',
    shadow: 'none',
  },
]

export default function Membership() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.membership-sh', {
      opacity: 0, y: 28, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: '.membership-sh', start: 'top 80%' },
    })
    gsap.from('.tier-card', {
      y: 36, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="membership"
      style={{ background: '#0D0D0D', padding: '108px 8vw 96px', textAlign: 'center' }}
    >
      <h2 className="membership-sh" style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: 'clamp(2.4rem, 5vw, 4rem)',
        letterSpacing: '0.06em',
        color: '#F0EDE8',
        lineHeight: 1, marginBottom: 18,
      }}>
        ENTER THE HOUSE
      </h2>
      <p style={{
        fontSize: 12, fontWeight: 300,
        color: 'rgba(240,237,232,0.28)',
        letterSpacing: '0.12em',
      }}>
        Three ways in. One standard.
      </p>

      <div className="tiers-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2, marginTop: 64, textAlign: 'left',
      }}>
        {tiers.map((t) => <TierCard key={t.id} tier={t} />)}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tiers-grid { grid-template-columns: 1fr !important; }
          #membership { padding: 72px 24px 64px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .tiers-grid { grid-template-columns: 1fr !important; max-width: 460px; margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  )
}

function TierCard({ tier }) {
  const isForge = tier.id === 'forge'

  const onEnter = (e) => {
    const card = e.currentTarget
    card.style.background = isForge ? '#8B0000' : '#181818'
    if (isForge) {
      card.querySelectorAll('.t-tn, .t-tp, .t-tper, .t-tf, .t-tbtn').forEach((el) => {
        el.style.color = '#000'
      })
      const tdiv = card.querySelector('.t-tdiv')
      if (tdiv) tdiv.style.background = 'rgba(0,0,0,0.15)'
      const btn = card.querySelector('.t-tbtn')
      if (btn) btn.style.borderColor = 'rgba(0,0,0,0.28)'
      const badge = card.querySelector('.t-most')
      if (badge) { badge.style.color = 'rgba(0,0,0,0.45)'; badge.style.borderColor = 'rgba(0,0,0,0.18)' }
    }
  }

  const onLeave = (e) => {
    const card = e.currentTarget
    card.style.background = 'transparent'
    if (isForge) {
      const tn = card.querySelector('.t-tn')
      const tp = card.querySelector('.t-tp')
      if (tn) tn.style.color = '#F0EDE8'
      if (tp)  tp.style.color = '#8B0000'
      card.querySelectorAll('.t-tper, .t-tf').forEach((el) => (el.style.color = ''))
      const tdiv = card.querySelector('.t-tdiv')
      if (tdiv) tdiv.style.background = 'rgba(240,237,232,0.06)'
      const btn = card.querySelector('.t-tbtn')
      if (btn) { btn.style.borderColor = 'rgba(240,237,232,0.16)'; btn.style.color = 'rgba(240,237,232,0.42)' }
      const badge = card.querySelector('.t-most')
      if (badge) { badge.style.color = 'rgba(139,0,0,0.65)'; badge.style.borderColor = 'rgba(139,0,0,0.28)' }
    }
  }

  return (
    <div
      className="tier-card"
      style={{
        padding: '44px 36px 40px',
        position: 'relative',
        border: `1px solid ${tier.borderColor}`,
        boxShadow: tier.shadow,
        transition: 'background 0.5s ease',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {tier.most && (
        <div className="t-most" style={{
          position: 'absolute', top: -1, left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontSize: 8, fontWeight: 300,
          textTransform: 'uppercase', letterSpacing: '0.32em',
          color: 'rgba(139,0,0,0.65)',
          border: '1px solid rgba(139,0,0,0.28)',
          borderTop: 'none',
          padding: '3px 14px 4px',
          transition: 'color 0.5s, border-color 0.5s',
        }}>
          MOST CHOSEN
        </div>
      )}

      <div className="t-tn" style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)',
        letterSpacing: '0.1em',
        color: '#F0EDE8', marginBottom: 26,
        transition: 'color 0.5s',
      }}>
        {tier.name}
      </div>

      <div className="t-tp" style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
        letterSpacing: '0.03em',
        color: tier.priceRed ? '#8B0000' : '#F0EDE8',
        transition: 'color 0.5s',
      }}>
        {tier.price}
      </div>

      <div className="t-tper" style={{
        fontSize: '10.5px', fontWeight: 300,
        color: 'rgba(240,237,232,0.2)',
        letterSpacing: '0.1em',
        marginTop: 4, marginBottom: 26,
        transition: 'color 0.5s',
      }}>
        / month
      </div>

      <div className="t-tdiv" style={{
        height: 1, background: 'rgba(240,237,232,0.06)',
        marginBottom: 22, transition: 'background 0.5s',
      }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 34px' }}>
        {tier.features.map((f, i) => (
          <li key={i} className="t-tf" style={{
            fontSize: 12, fontWeight: 300,
            color: 'rgba(240,237,232,0.4)',
            padding: '7px 0',
            borderBottom: '1px solid rgba(240,237,232,0.05)',
            letterSpacing: '0.02em',
            transition: 'color 0.5s',
          }}>
            {f}
          </li>
        ))}
      </ul>

      <button
        className="t-tbtn"
        style={{
          width: '100%', padding: 14,
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: 13, letterSpacing: '0.2em',
          border: '1px solid rgba(240,237,232,0.16)',
          background: 'transparent',
          color: 'rgba(240,237,232,0.42)',
          transition: 'all 0.4s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isForge) {
            e.currentTarget.style.background = '#222'
            e.currentTarget.style.color = '#F0EDE8'
            e.currentTarget.style.borderColor = 'rgba(240,237,232,0.28)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isForge) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'rgba(240,237,232,0.42)'
            e.currentTarget.style.borderColor = 'rgba(240,237,232,0.16)'
          }
        }}
      >
        CLAIM YOUR SPOT
      </button>
    </div>
  )
}
