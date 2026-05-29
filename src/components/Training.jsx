import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { tokens } from '../tokens'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { SectionReveal } from './SectionReveal'

const PROGRAMS = [
  {
    name: 'Strength',
    tagline: 'Build Unbreakable Power',
    description:
      'Compound lifting programmes engineered by strength coaches with Olympic backgrounds. From beginner to competitive powerlifter.',
    detail: '3–5 days / week · All levels',
  },
  {
    name: 'HIIT',
    tagline: 'Burn. Recover. Repeat.',
    description:
      'High-intensity interval training designed to maximise caloric burn, cardiovascular conditioning, and metabolic adaptation.',
    detail: '4–6 days / week · Intermediate',
  },
  {
    name: 'Combat',
    tagline: 'Warrior Conditioning',
    description:
      'Boxing, Muay Thai, and grappling integrated with strength and conditioning to develop complete athletic fighters.',
    detail: '3–4 days / week · All levels',
  },
]

function ExploreLink({ href }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontFamily: tokens.fonts.body,
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: h ? tokens.colors.accent : tokens.colors.textMuted,
        textDecoration: 'none',
        transition: 'color 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      Explore <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
    </a>
  )
}

export function Training() {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.training-card', {
        x: -70,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="training"
      ref={sectionRef}
      style={{
        backgroundColor: tokens.colors.background,
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div style={{ marginBottom: '64px' }}>
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
              Choose Your Path
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
              TRAINING PROGRAMMES
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
          {PROGRAMS.map((prog) => (
            <div
              key={prog.name}
              className="training-card"
              style={{
                backgroundColor: tokens.colors.cardBg,
                border: `1px solid ${tokens.colors.cardBorder}`,
                borderTop: `3px solid ${tokens.colors.accent}`,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: tokens.fonts.display,
                    fontSize: '2.5rem',
                    letterSpacing: '0.05em',
                    color: tokens.colors.secondary,
                    margin: '0 0 8px',
                    lineHeight: 1,
                  }}
                >
                  {prog.name}
                </h3>
                <p
                  style={{
                    fontFamily: tokens.fonts.body,
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: tokens.colors.accent,
                    margin: 0,
                  }}
                >
                  {prog.tagline}
                </p>
              </div>

              <p
                style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '0.9375rem',
                  lineHeight: 1.72,
                  color: tokens.colors.textMuted,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {prog.description}
              </p>

              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  paddingTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: tokens.fonts.body,
                    fontSize: '0.75rem',
                    color: tokens.colors.textMuted,
                    letterSpacing: '0.05em',
                  }}
                >
                  {prog.detail}
                </span>
                <ExploreLink href="#join" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
