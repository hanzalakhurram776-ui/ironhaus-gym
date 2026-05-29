import { tokens } from '../tokens'

const LINKS = ['Training', 'Coaches', 'Pricing', 'Join']

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(40px, 5vw, 56px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          style={{ gap: '28px', marginBottom: '32px' }}
        >
          <span
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: '1.6rem',
              letterSpacing: '0.1em',
              color: tokens.colors.secondary,
            }}
          >
            IRONHAUS
          </span>

          <nav className="flex flex-wrap" style={{ gap: '28px' }}>
            {LINKS.map((link) => (
              <FooterLink key={link} href={`#${link.toLowerCase()}`} label={link} />
            ))}
          </nav>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <p
            style={{
              fontFamily: tokens.fonts.body,
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} IRONHAUS Training Facility. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: tokens.fonts.body,
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.15)',
              margin: 0,
            }}
          >
            Results require dedication, consistency, and hard work. Individual results may vary.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: tokens.fonts.body,
        fontSize: '0.8125rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = tokens.colors.secondary)}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
    >
      {label}
    </a>
  )
}
