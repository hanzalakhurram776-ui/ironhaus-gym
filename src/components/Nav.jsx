import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const links = [
  { label: 'Training',   href: '#members'    },
  { label: 'Programs',   href: '#programs'   },
  { label: 'Membership', href: '#membership' },
  { label: 'Enter',      href: '#cta'        },
]

export default function Nav() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    const hero = document.getElementById('hero-section')
    if (!hero) return

    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom top',
      onEnter: () => navRef.current?.classList.add('visible'),
      onLeaveBack: () => {
        navRef.current?.classList.remove('visible')
        setMenuOpen(false)
      },
    })
  })

  return (
    <>
      <nav
        id="nav"
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 48px',
          borderBottom: '1px solid rgba(139,0,0,0.2)',
          background: 'rgba(10,10,10,0)',
          backdropFilter: 'blur(0px)',
          opacity: 0,
          transform: 'translateY(-10px)',
          pointerEvents: 'none',
          transition: 'opacity 0.7s ease, transform 0.7s ease, background 0.6s ease, backdrop-filter 0.6s ease',
        }}
      >
        <a
          href="#hero-section"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: '1.05rem',
            letterSpacing: '0.14em',
            color: 'rgba(139,0,0,0.65)',
          }}
        >
          IRONHAUS
        </a>

        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: '10.5px',
                fontWeight: 300,
                fontVariant: 'small-caps',
                letterSpacing: '0.25em',
                color: 'rgba(240,237,232,0.42)',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F0EDE8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.42)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="nav-mob-btn"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: '#F0EDE8', fontSize: '1.4rem', lineHeight: 1, padding: '2px 0',
          }}
        >
          &#9776;
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 57, left: 0, right: 0,
          zIndex: 499,
          background: 'rgba(8,8,8,0.98)',
          padding: '20px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 18,
          borderTop: '1px solid rgba(139,0,0,0.15)',
        }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '10.5px', fontWeight: 300,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(240,237,232,0.42)',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        #nav.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: all !important;
          background: rgba(10,10,10,0.94) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
        }
        @media (max-width: 768px) {
          #nav { padding: 16px 20px !important; }
          .nav-links-desktop { display: none !important; }
          .nav-mob-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
