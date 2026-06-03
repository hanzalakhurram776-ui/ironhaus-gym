import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="training"
      ref={ref}
      style={{ padding: 'clamp(7rem,10vw,10rem) 48px' }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(4rem,6vw,6rem)',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Left */}
        <div>
          <motion.p
            variants={fade}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#E38734', fontWeight: 500, marginBottom: 24 }}
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            variants={fade}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 32,
            }}
          >
            Built for those who<br />refuse to settle.
          </motion.h2>

          <motion.p
            variants={fade}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontWeight: 300, marginBottom: 40 }}
          >
            IRONHAUS was founded on a single belief: that serious training demands a serious environment. Every piece of equipment, every coaching session, every program is engineered to push you past what you thought was possible. This is where discipline becomes identity.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', gap: 48 }}
          >
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: '#fff' }}>
                15K+
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                Members trained
              </p>
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: '#fff' }}>
                98%
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                Goal achievement
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ border: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}
        >
          <img
            src="/images/about.jpg"
            alt="Athletic training"
            style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
