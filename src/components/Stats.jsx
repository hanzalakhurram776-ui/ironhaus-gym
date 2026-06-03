import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { value: 2400, suffix: '+', label: 'Active Members' },
  { value: 43, suffix: '', label: 'Expert Coaches' },
  { value: 10, suffix: '', label: 'Years Training' },
  { value: 89, suffix: '%', label: 'Retention Rate' },
]

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    let startTime = null

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, target])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '64px 0',
      }}
    >
      <div
        className="stats-grid"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32,
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
            </div>
            <p
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.3)',
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
