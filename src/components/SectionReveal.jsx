import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function SectionReveal({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={reduced ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
