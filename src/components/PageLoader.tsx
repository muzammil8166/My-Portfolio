import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function PageLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), 650)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-[rgb(var(--bg))]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="h-3 w-3 rounded-full bg-purple-500"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="h-3 w-3 rounded-full bg-fuchsia-500"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.12,
              }}
            />
            <motion.div
              className="h-3 w-3 rounded-full bg-cyan-400"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.24,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

