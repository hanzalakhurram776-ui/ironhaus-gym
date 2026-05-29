import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { tokens } from '../tokens'

const LINKS = ['Training', 'Coaches', 'Pricing', 'Join']

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? tokens.colors.navBg : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between"
        style={{ height: '68px', padding: '0 clamp(20px, 5vw, 48px)' }}
      >
        <a
          href="#"
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: '1.6rem',
            letterSpacing: '0.1em',
            color: tokens.colors.secondary,
            textDecoration: 'none',
          }}
        >
          IRONHAUS
        </a>

        <div className="hidden md:flex items-center" style={{ gap: '36px' }}>
          {LINKS.map((link) => (
            <NavLink key={link} href={`#${link.toLowerCase()}`} label={link} />
          ))}
          <NavCta href="#join" label="Join Now" />
        </div>

        <div className="md:hidden">
          <NavCta href="#join" label="Join Now" small />
        </div>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, label }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontFamily: tokens.fonts.body,
        fontSize: '0.8125rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: h ? tokens.colors.secondary : tokens.colors.textMuted,
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {label}
    </a>
  )
}

function NavCta({ href, label, small = false }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontFamily: tokens.fonts.body,
        fontSize: small ? '0.72rem' : '0.78rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: tokens.colors.secondary,
        backgroundColor: h ? tokens.colors.accentHover : tokens.colors.accent,
        padding: small ? '8px 16px' : '10px 24px',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        boxShadow: h ? tokens.colors.accentGlow : 'none',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {label}
    </a>
  )
}
