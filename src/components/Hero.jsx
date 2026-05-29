import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { tokens } from '../tokens'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HEADLINE = ['FORGE', 'YOUR', 'LIMITS.']

function HeroBtn({ href, children }) {
  const [h, setH] = useState(false)
  return (
    <a
      href={href}
      style={{
        fontFamily: tokens.fonts.body,
        fontSize: '0.82rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: tokens.colors.secondary,
        backgroundColor: h ? tokens.colors.accentHover : tokens.colors.accent,
        padding: '16px 44px',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        boxShadow: h ? tokens.colors.accentGlow : 'none',
      }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {children}
    </a>
  )
}

export function Hero() {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
    renderer.setClearColor(0x000000, 0)

    const geo = new THREE.IcosahedronGeometry(tokens.three.radius, tokens.three.detail)
    const mat = new THREE.MeshBasicMaterial({
      color: tokens.three.color,
      wireframe: true,
      opacity: 0.85,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    let baseX = 0
    let baseY = 0
    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      baseX += 0.003
      baseY += 0.005
      mesh.rotation.x = baseX + mouseY * 0.18
      mesh.rotation.y = baseY + mouseX * 0.18
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [reduced])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <img
        src={tokens.images.hero}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: tokens.colors.overlay,
          zIndex: 1,
        }}
      />

      {/* Three.js wireframe canvas */}
      {!reduced && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,60px) clamp(60px,8vw,80px)',
          maxWidth: '960px',
          width: '100%',
        }}
      >
        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: tokens.animation.ease }}
          style={{
            fontFamily: tokens.fonts.body,
            fontSize: '0.72rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: tokens.colors.accent,
            marginBottom: '24px',
          }}
        >
          Premium Training Facility
        </motion.p>

        <h1
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(4.5rem, 14vw, 13rem)',
            lineHeight: 0.92,
            color: tokens.colors.secondary,
            margin: '0 0 36px',
            letterSpacing: '0.02em',
          }}
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              initial={reduced ? {} : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', marginRight: '0.18em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: tokens.animation.ease }}
          style={{
            fontFamily: tokens.fonts.body,
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.7,
            color: tokens.colors.textMuted,
            maxWidth: '520px',
            margin: '0 auto 40px',
          }}
        >
          Where elite athletes are forged. IRONHAUS combines science-backed
          programming with world-class coaching to push you past every limit.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.15, ease: tokens.animation.ease }}
        >
          <HeroBtn href="#join">Join IRONHAUS</HeroBtn>
        </motion.div>
      </div>

      {/* Bottom fade to page background */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: `linear-gradient(to top, ${tokens.colors.background} 0%, transparent 100%)`,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
