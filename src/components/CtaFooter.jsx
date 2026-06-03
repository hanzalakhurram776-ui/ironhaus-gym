import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quickLinks = ['Training', 'Coaches', 'Pricing', 'Contact']

export default function CtaFooter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: 'clamp(7rem,10vw,10rem) 48px', backgroundColor: '#0D0D0D' }}
    >
      {/* CTA */}
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            color: '#fff',
            marginBottom: 24,
          }}
        >
          Ready to begin?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            style={{
              backgroundColor: '#E38734',
              color: '#000',
              padding: '20px 48px',
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#D4771E')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E38734')}
          >
            Join IRONHAUS
          </button>

          <div style={{ marginTop: 24 }}>
            <a
              href="https://wa.me/923063666888"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              Or message us on WhatsApp →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ maxWidth: 1400, margin: '80px auto 0', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 48, paddingBottom: 32 }}>
        <div
          className="footer-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 48 }}
        >
          {/* Col 1 */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#fff',
                marginBottom: 12,
              }}
            >
              IRONHAUS
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              Premium training facility.<br />Where elite athletes are made.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>
              Quick Links
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {quickLinks.map((link) => (
                <li key={link} style={{ marginBottom: 8 }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>
              Contact
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Lahore, Pakistan</li>
              <li style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>+92 306 366 6888</li>
              <li>
                <a
                  href="mailto:info@ironhaus.pk"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  info@ironhaus.pk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 32 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>© 2026 IRONHAUS. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
