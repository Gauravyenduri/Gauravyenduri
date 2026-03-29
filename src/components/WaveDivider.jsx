import { motion } from 'framer-motion'

export default function WaveDivider({ fill = '#ffffff', bg = 'transparent', speed = 1, flipped = false }) {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${flipped ? 'scale-y-[-1]' : ''}`}
      style={{ height: 80, lineHeight: 0, backgroundColor: bg }}
    >
      {/* Layer 1 — back, slower, semi-transparent */}
      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: '200%' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 13 / speed, ease: 'linear' }}
      >
        <svg height="80" viewBox="0 0 2880 80" width="100%" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1440,80 1800,0 2160,40 C2520,80 2880,0 3240,40 L3240,80 L0,80 Z"
            fill={fill}
            opacity="0.45"
          />
        </svg>
      </motion.div>
      {/* Layer 2 — front, faster, solid */}
      <motion.div
        className="absolute bottom-0 left-0"
        style={{ width: '200%' }}
        animate={{ x: ['-50%', '0%'] }}
        transition={{ repeat: Infinity, duration: 8 / speed, ease: 'linear' }}
      >
        <svg height="60" viewBox="0 0 2880 60" width="100%" preserveAspectRatio="none">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 C1680,60 1920,0 2160,30 C2400,60 2640,0 2880,30 L2880,60 L0,60 Z"
            fill={fill}
          />
        </svg>
      </motion.div>
    </div>
  )
}
