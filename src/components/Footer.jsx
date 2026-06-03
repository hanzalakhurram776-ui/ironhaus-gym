import { memo } from 'react'

function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: '#000',
        padding: '58px 8vw 38px',
        textAlign: 'center',
        borderTop: '1px solid rgba(139,0,0,0.07)',
      }}
    >
      <div style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: '1.25rem', letterSpacing: '0.16em',
        color: 'rgba(139,0,0,0.42)',
        marginBottom: 10,
      }}>
        IRONHAUS
      </div>
      <div style={{
        width: 40, height: 1,
        background: 'rgba(139,0,0,0.28)',
        margin: '0 auto 26px',
      }} />
      <p style={{
        fontSize: '10.5px', fontWeight: 300,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'rgba(240,237,232,0.16)',
        marginBottom: 9,
      }}>
        DHA Phase 5 &middot; Lahore &middot; Pakistan
      </p>
      <p style={{
        fontSize: 11, fontWeight: 300, letterSpacing: '0.06em',
        color: 'rgba(240,237,232,0.11)',
        marginBottom: 42,
      }}>
        ironhaus@ironhaus.pk &nbsp;&middot;&nbsp; +92 300 000 0000
      </p>
      <p style={{
        fontSize: 9, fontWeight: 300,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(240,237,232,0.07)',
      }}>
        &copy; 2026 IRONHAUS. All rights reserved.
      </p>

      <style>{`
        @media (max-width: 768px) {
          #footer { padding: 46px 24px 32px !important; }
        }
      `}</style>
    </footer>
  )
}

export default memo(Footer)
