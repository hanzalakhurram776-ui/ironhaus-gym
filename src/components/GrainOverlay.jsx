import { memo, useEffect, useRef } from 'react'

function GrainOverlay() {
  const turbRef = useRef(null)

  useEffect(() => {
    // On mobile the grain is static — seed cycling is expensive (full-screen SVG filter
    // repaint at 11fps) and imperceptible at 3.8% opacity.
    if (window.matchMedia('(max-width: 768px)').matches) return

    let seed = 0
    let timer
    const shift = () => {
      if (turbRef.current) turbRef.current.setAttribute('seed', (seed++ % 600).toString())
      timer = setTimeout(shift, 90)
    }
    timer = setTimeout(shift, 90)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 9000,
      opacity: 0.038, mixBlendMode: 'overlay',
      width: '100%', height: '100%',
    }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="gf" x="0" y="0" width="100%" height="100%">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#gf)" />
      </svg>
    </div>
  )
}

export default memo(GrainOverlay)
