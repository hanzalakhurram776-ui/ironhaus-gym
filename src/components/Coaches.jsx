import { useState } from 'react'
import { tokens } from '../tokens'
import { SectionReveal } from './SectionReveal'

const COACHES = [
  {
    name: 'Marcus Reid',
    specialty: 'Strength & Powerlifting',
    bio: '10× national champion. Former Olympic training camp coach.',
    img: tokens.images.coach1,
  },
  {
    name: 'Leon Torres',
    specialty: 'HIIT & Conditioning',
    bio: 'Certified NSCA-CPT. 12 years of elite athletic performance coaching.',
    img: tokens.images.coach2,
  },
  {
    name: 'Aisha Patel',
    specialty: 'Combat & Martial Arts',
    bio: 'Muay Thai champion. Certified MMA strength and conditioning specialist.',
    img: tokens.images.coach3,
  },
]

function CoachCard({ coach }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ overflow: 'hidden', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div style={{ overflow: 'hidden', aspectRatio: '3/4', position: 'relative' }}>
        <img
          src={coach.img}
          alt={coach.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transition: 'transform 0.65s cubic-bezier(0.25,0.1,0.25,1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {/* Red hover overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: tokens.colors.accent,
            opacity: hovered ? 0.2 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.2) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Coach info overlaid on image */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
          }}
        >
          <p
            style={{
              fontFamily: tokens.fonts.body,
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: tokens.colors.accent,
              margin: '0 0 6px',
            }}
          >
            {coach.specialty}
          </p>
          <h3
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: '1.9rem',
              letterSpacing: '0.04em',
              color: tokens.colors.secondary,
              margin: '0 0 8px',
              lineHeight: 1.05,
            }}
          >
            {coach.name}
          </h3>
          <p
            style={{
              fontFamily: tokens.fonts.body,
              fontSize: '0.8125rem',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {coach.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Coaches() {
  return (
    <section
      id="coaches"
      style={{
        backgroundColor: tokens.colors.background,
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div style={{ marginBottom: '60px' }}>
            <p
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '0.72rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: tokens.colors.accent,
                marginBottom: '14px',
              }}
            >
              The Experts
            </p>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                letterSpacing: '0.03em',
                color: tokens.colors.secondary,
                margin: 0,
                lineHeight: 1,
              }}
            >
              MEET YOUR COACHES
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {COACHES.map((coach, i) => (
            <SectionReveal key={coach.name} delay={i * 0.12}>
              <CoachCard coach={coach} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
