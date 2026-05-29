import { useState } from 'react'
import { tokens } from '../tokens'
import { SectionReveal } from './SectionReveal'

const TIERS = [
  {
    name: 'Starter',
    price: '8,999',
    period: 'PKR / mo',
    tagline: 'Begin your journey',
    features: [
      'Full gym access',
      '2 group classes / week',
      'Locker & shower access',
      'Fitness assessment',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '14,999',
    period: 'PKR / mo',
    tagline: 'Most popular choice',
    features: [
      'Everything in Starter',
      'Unlimited group classes',
      '1 PT session / month',
      'Nutrition starter guide',
      'Recovery zone access',
    ],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '24,999',
    period: 'PKR / mo',
    tagline: 'Total transformation',
    features: [
      'Everything in Pro',
      '4 PT sessions / month',
      'Custom nutrition plan',
      'Recovery suite access',
      'Priority booking',
    ],
    highlighted: false,
  },
]

function PricingCard({ tier, index }) {
  const [h, setH] = useState(false)
  return (
    <SectionReveal delay={index * 0.1}>
      <div
        style={{
          backgroundColor: tier.highlighted ? tokens.colors.pricingHighlight : tokens.colors.cardBg,
          border: tier.highlighted
            ? `2px solid ${tokens.colors.accent}`
            : `1px solid ${tokens.colors.cardBorder}`,
          padding: '40px 32px',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {tier.highlighted && (
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: tokens.colors.accent,
              padding: '4px 18px',
              fontFamily: tokens.fonts.body,
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: tokens.colors.secondary,
              whiteSpace: 'nowrap',
            }}
          >
            Most Popular
          </div>
        )}

        <p
          style={{
            fontFamily: tokens.fonts.body,
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: tier.highlighted ? tokens.colors.accent : tokens.colors.textMuted,
            margin: '0 0 8px',
          }}
        >
          {tier.tagline}
        </p>

        <h3
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: '2.4rem',
            letterSpacing: '0.06em',
            color: tokens.colors.secondary,
            margin: '0 0 20px',
            lineHeight: 1,
          }}
        >
          {tier.name}
        </h3>

        <div style={{ marginBottom: '32px' }}>
          <span
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: '3rem',
              color: tier.highlighted ? tokens.colors.accent : tokens.colors.secondary,
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {tier.price}
          </span>
          <span
            style={{
              fontFamily: tokens.fonts.body,
              fontSize: '0.8rem',
              color: tokens.colors.textMuted,
              marginLeft: '8px',
            }}
          >
            {tier.period}
          </span>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flexGrow: 1,
          }}
        >
          {tier.features.map((f) => (
            <li
              key={f}
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '0.875rem',
                color: tokens.colors.textMuted,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: tokens.colors.accent, flexShrink: 0, marginTop: '2px' }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href="#join"
          style={{
            fontFamily: tokens.fonts.body,
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'block',
            padding: '14px',
            textDecoration: 'none',
            transition: 'background-color 0.2s, box-shadow 0.2s',
            color: tier.highlighted ? tokens.colors.secondary : tokens.colors.secondary,
            backgroundColor: tier.highlighted
              ? h ? tokens.colors.accentHover : tokens.colors.accent
              : h ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: tier.highlighted ? 'none' : `1px solid rgba(255,255,255,0.15)`,
            boxShadow: (tier.highlighted && h) ? tokens.colors.accentGlow : 'none',
          }}
          onMouseEnter={() => setH(true)}
          onMouseLeave={() => setH(false)}
        >
          Get Started
        </a>
      </div>
    </SectionReveal>
  )
}

export function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        backgroundColor: tokens.colors.statsBg,
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '0.72rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: tokens.colors.accent,
                marginBottom: '14px',
              }}
            >
              Simple Pricing
            </p>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                letterSpacing: '0.03em',
                color: tokens.colors.secondary,
                margin: 0,
                lineHeight: 1,
              }}
            >
              MEMBERSHIP PLANS
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', alignItems: 'start' }}>
          {TIERS.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
