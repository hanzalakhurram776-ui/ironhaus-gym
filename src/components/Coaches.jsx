import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const coaches = [
  { name: 'Ahmed Raza', role: 'Strength & Powerlifting', image: '/images/coach-1.jpg' },
  { name: 'Hassan Ali', role: 'HIIT & Conditioning', image: '/images/coach-2.jpg' },
  { name: 'Fatima Sheikh', role: 'Combat & Martial Arts', image: '/images/coach-3.jpg' },
]

export default function Coaches() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="coaches"
      ref={ref}
      style={{ padding: 'clamp(7rem,10vw,10rem) 48px' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#E38734', fontWeight: 500, marginBottom: 24 }}
        >
          Our Team
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: 64,
          }}
        >
          Meet your coaches.
        </motion.h2>

        <div
          className="coaches-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {coaches.map((coach, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ cursor: 'pointer' }}
              className="coach-card"
            >
              <div style={{ overflow: 'hidden', aspectRatio: '3/4' }}>
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="coach-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.7s ease, transform 0.7s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)'
                    e.currentTarget.style.transform = 'scale(1.03)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              </div>
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{coach.name}</h3>
                <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#E38734' }}>{coach.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .coaches-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .coaches-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
