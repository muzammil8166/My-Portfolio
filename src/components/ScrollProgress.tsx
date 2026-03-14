import { motion, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const spring = useSpring(progress, { stiffness: 300, damping: 40 })

  useEffect(() => {
    spring.set(progress)
  }, [progress, spring])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400"
      style={{ scaleX: spring }}
    />
  )
}

