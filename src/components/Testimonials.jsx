import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{ padding: 'clamp(7rem,10vw,10rem) 48px' }}
    >
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0 }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 120,
              fontWeight: 300,
              lineHeight: 1,
              color: 'rgba(227,135,52,0.2)',
              userSelect: 'none',
              marginBottom: -24,
            }}
          >
            "
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: 32,
            }}
          >
            IRONHAUS didn't just change my body — it changed my entire relationship with discipline. The coaches here operate at a level I've never seen anywhere else. Three months in, I'm a different person.
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 4 }}>Zara Malik</p>
            <p style={{ fontSize: 12, color: '#E38734', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Member since 2024
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
