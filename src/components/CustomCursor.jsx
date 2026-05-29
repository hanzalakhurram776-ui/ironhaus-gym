import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { tokens } from '../tokens'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const cursorRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (reduced) return
    // Only enable on true pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = e.clientX + 'px'
      cursorRef.current.style.top = e.clientY + 'px'
    }
    const onOver = (e) => {
      setHovering(!!(e.target.closest('a, button, [data-hover]')))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: '-20px',
        left: '-20px',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: tokens.colors.accent,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'left, top, width, height',
      }}
      animate={{ width: hovering ? 28 : 10, height: hovering ? 28 : 10, opacity: hovering ? 0.75 : 1 }}
      transition={{ duration: 0.13, ease: 'easeOut' }}
    />
  )
}
