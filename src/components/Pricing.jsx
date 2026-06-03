import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const tiers = [
  {
    tier: 'Starter',
    name: 'Basic',
    price: '8,999',
    features: [
      'Full gym access',
      '1 group class / week',
      'Locker room access',
      'Fitness assessment',
    ],
  },
  {
    tier: 'Pro',
    name: 'Performance',
    price: '14,999',
    popular: true,
    features: [
      'Everything in Starter',
      'Unlimited group classes',
      '2 PT sessions / month',
      'Nutrition consultation',
      'Priority booking',
    ],
  },
  {
    tier: 'Elite',
    name: 'Premium',
    price: '24,999',
    features: [
      'Everything in Pro',
      'Weekly PT sessions',
      'Custom programming',
      'Recovery suite access',
      'VIP locker room',
      'Guest passes (2 / month)',
    ],
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ padding: 'clamp(7rem,10vw,10rem) 48px', backgroundColor: '#0D0D0D' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#E38734', fontWeight: 500, marginBottom: 24 }}
        >
          Membership
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
          Invest in yourself.
        </motion.h2>

        <div
          className="pricing-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                position: 'relative',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: `1px solid ${t.popular ? 'rgba(227,135,52,0.2)' : 'rgba(255,255,255,0.04)'}`,
                padding: 40,
              }}
            >
              {t.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 32,
                    backgroundColor: '#E38734',
                    color: '#000',
                    fontSize: 10,
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                  }}
                >
                  Most Popular
                </span>
              )}

              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
                {t.tier}
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  fontWeight: 300,
                  color: '#fff',
                  marginBottom: 24,
                }}
              >
                {t.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>PKR</span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 48,
                    fontWeight: 300,
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {t.price}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', marginBottom: 32 }}>per month</p>

              <div style={{ width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 32 }} />

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {t.features.map((f, j) => (
                  <li
                    key={j}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#E38734', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: '100%',
                  marginTop: 32,
                  padding: '16px 0',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E38734'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.borderColor = '#E38734'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
