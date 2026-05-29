import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { tokens } from '../tokens'
import { useReducedMotion } from '../hooks/useReducedMotion'

const STATS = [
  { value: 2400, suffix: '+', label: 'Members' },
  { value: 48, suffix: '', label: 'Expert Coaches' },
  { value: 12, suffix: '', label: 'Years Training' },
  { value: 97, suffix: '%', label: 'Retention Rate' },
]

export function Stats() {
  return (
    <section
      id="stats"
      style={{
        backgroundColor: tokens.colors.statsBg,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 48px)',
      }}
    >
      <div
        className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4"
        style={{ gap: '40px' }}
      >
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}

function StatItem({ stat, index }) {
  const numRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !numRef.current) return

    const obj = { count: 0 }
    const tween = gsap.to(obj, {
      count: stat.value,
      duration: 2.2,
      ease: 'power2.out',
      delay: index * 0.12,
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = Math.round(obj.count) + stat.suffix
        }
      },
      scrollTrigger: {
        trigger: numRef.current,
        start: 'top 88%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, stat.value, stat.suffix, index])

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={numRef}
        style={{
          fontFamily: tokens.fonts.display,
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: 1,
          color: tokens.colors.secondary,
          marginBottom: '10px',
          letterSpacing: '0.02em',
        }}
      >
        {reduced ? stat.value + stat.suffix : '0' + stat.suffix}
      </div>
      <p
        style={{
          fontFamily: tokens.fonts.body,
          fontSize: '0.8125rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: tokens.colors.textMuted,
          margin: 0,
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}
