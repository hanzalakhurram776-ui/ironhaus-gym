import { useState } from 'react'
import { tokens } from '../tokens'
import { SectionReveal } from './SectionReveal'

const PROGRAMS = ['Strength', 'HIIT', 'Combat', 'Open Gym', 'Unsure — Help Me Choose']

const fieldStyle = {
  width: '100%',
  backgroundColor: tokens.colors.inputBg,
  border: `1px solid ${tokens.colors.inputBorder}`,
  color: tokens.colors.secondary,
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9375rem',
  padding: '14px 18px',
  outline: 'none',
  display: 'block',
}

export function Join() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', program: '' })
  const [submitted, setSubmitted] = useState(false)
  const [btnHover, setBtnHover] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <section
      id="join"
      style={{
        backgroundColor: tokens.colors.background,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '0.72rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: tokens.colors.accent,
                marginBottom: '16px',
              }}
            >
              Start Today
            </p>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                letterSpacing: '0.02em',
                color: tokens.colors.secondary,
                margin: '0 0 16px',
                lineHeight: 0.95,
              }}
            >
              YOUR TRANSFORMATION<br />STARTS TODAY.
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: '2.5rem',
                  letterSpacing: '0.05em',
                  color: tokens.colors.secondary,
                  margin: '0 0 12px',
                }}
              >
                LET'S GO.
              </p>
              <p style={{ fontFamily: tokens.fonts.body, fontSize: '0.9375rem', color: tokens.colors.textMuted, margin: 0 }}>
                Our team will reach out within 24 hours to get you started.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <Field label="Full Name">
                  <input name="name" type="text" placeholder="Your name" required value={form.name} onChange={onChange} style={fieldStyle} />
                </Field>
                <Field label="Email">
                  <input name="email" type="email" placeholder="you@email.com" required value={form.email} onChange={onChange} style={fieldStyle} />
                </Field>
                <Field label="Phone">
                  <input name="phone" type="tel" placeholder="+92 300 0000000" value={form.phone} onChange={onChange} style={fieldStyle} />
                </Field>
                <Field label="Programme">
                  <select name="program" value={form.program} onChange={onChange} style={{ ...fieldStyle, cursor: 'pointer' }}>
                    <option value="" style={{ backgroundColor: tokens.colors.cardBg }}>Select a programme</option>
                    {PROGRAMS.map((p) => (
                      <option key={p} value={p} style={{ backgroundColor: tokens.colors.cardBg }}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  fontFamily: tokens.fonts.body,
                  fontSize: '0.82rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: tokens.colors.secondary,
                  backgroundColor: btnHover ? tokens.colors.accentHover : tokens.colors.accent,
                  border: 'none',
                  padding: '18px',
                  marginTop: '8px',
                  transition: 'background-color 0.2s, box-shadow 0.2s',
                  boxShadow: btnHover ? tokens.colors.accentGlow : 'none',
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                Claim My Spot
              </button>
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: tokens.fonts.body,
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: tokens.colors.textMuted,
          marginBottom: '8px',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
