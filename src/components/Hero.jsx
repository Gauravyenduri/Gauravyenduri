import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const roles = [
  'Full Stack Developer',
  'Java Spring Boot Engineer',
  'AI & Computer Vision Dev',
  'Software Engineer',
]

const socials = [
  {
    label: 'GitHub', href: 'https://github.com/Gauravyenduri',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/in/gaurav-yenduri-37762722a/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'Email', href: 'mailto:gauravyenduri19@gmail.com',
    path: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
]

const floatingBadges = [
  { emoji: '☕', text: 'Spring Boot', delay: 0, position: 'top-6 -left-8', anim: { y: [0, -10, 0] }, dur: 3 },
  { emoji: '🤖', text: 'AI / ML', delay: 1, position: '-bottom-6 -right-4', anim: { y: [0, 10, 0] }, dur: 4 },
  { emoji: '🎓', text: 'UNT — Texas', delay: 0.5, position: 'top-1/2 -right-14 -translate-y-1/2', anim: { y: [0, -8, 0] }, dur: 3.5 },
  { emoji: '⚡', text: '35% faster', delay: 1.5, position: '-top-8 right-10', anim: { x: [0, 4, 0] }, dur: 2.8 },
]

const codeParticles = [
  { text: '@SpringBootApplication', x: '4%', y: '20%', delay: 0, dur: 7 },
  { text: 'SELECT * FROM users WHERE id = ?', x: '66%', y: '12%', delay: 1.2, dur: 9 },
  { text: 'kubectl apply -f deployment.yaml', x: '60%', y: '76%', delay: 2, dur: 8 },
  { text: '@Entity @Table(name="users")', x: '5%', y: '70%', delay: 0.8, dur: 10 },
  { text: 'git push origin main', x: '38%', y: '88%', delay: 1.8, dur: 7 },
  { text: 'docker-compose up --build', x: '46%', y: '6%', delay: 3, dur: 9 },
  { text: 'const model = new Sequential()', x: '14%', y: '50%', delay: 2.5, dur: 8 },
  { text: 'mvn spring-boot:run', x: '72%', y: '44%', delay: 1, dur: 11 },
]

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], [0, 100])
  const opacityHero = useTransform(scrollY, [0, 380], [1, 0])

  /* ── typewriter ── */
  useEffect(() => {
    const role = roles[roleIdx]
    let timeout
    if (!deleting && text === role) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setText(prev => deleting ? prev.slice(0, -1) : role.slice(0, prev.length + 1))
      }, deleting ? 35 : 75)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 40%, #faf5ff 70%, #ede9fe 100%)',
      }}
    >
      {/* ── Dot grid ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.12) 1.5px, transparent 1.5px)',
            backgroundSize: '36px 36px',
          }}
        />
      </motion.div>

      {/* ── Floating code particles ── */}
      {codeParticles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.09, 0.06, 0.09, 0], y: [0, -16, 0, 16, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none select-none font-mono text-[11px] text-indigo-800 whitespace-nowrap"
          style={{ left: p.x, top: p.y }}
        >
          {p.text}
        </motion.div>
      ))}

      {/* ── Aurora blobs ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/70 to-purple-200/50 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -left-20 w-[450px] h-[450px] bg-gradient-to-br from-pink-200/50 to-violet-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-sky-100/60 to-indigo-100/40 rounded-full blur-3xl"
        />
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: opacityHero }}
        className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pt-28 pb-24"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-7 shadow-sm backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Open to Full-time &amp; Internship Opportunities
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight"
            >
              Hi, I&apos;m{' '}
              <br />
              <motion.span
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] inline-block"
              >
                Gaurav Sai Nitin
              </motion.span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-600 mb-7 min-h-[2.25rem]"
            >
              <span>{text}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.85 }}
                className="inline-block w-[2px] h-7 bg-indigo-500 rounded shrink-0"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-[1.05rem] leading-relaxed mb-9 max-w-[500px]"
            >
              Results-driven Software Developer specializing in Java Spring Boot, Angular, and AI/ML.
              Masters student at UNT with hands-on experience building scalable enterprise systems.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-9">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200/60 hover:shadow-indigo-300/70 transition-shadow text-[15px]"
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl border-2 border-slate-200 bg-white/70 text-slate-700 font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/60 transition-all text-[15px] backdrop-blur-sm"
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="text-slate-400 text-sm font-medium">Find me on</span>
              <div className="w-8 border-t border-slate-200" />
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noreferrer" aria-label={s.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.12, type: 'spring', stiffness: 400 }}
                  whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-white/80 border border-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition-all shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]">

              {/* Outer glow pulse */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300/60 to-purple-300/50 blur-2xl scale-110 pointer-events-none"
              />

              {/* Rotating dashed rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-300/50 scale-[1.12]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dotted border-purple-300/40 scale-[1.26]"
              />

              {/* Main avatar circle */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 border-[5px] border-white shadow-2xl shadow-indigo-300/40 flex items-center justify-center overflow-hidden">

                {/* Inner concentric rings */}
                <div className="absolute inset-0 opacity-[0.08]">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-indigo-500"
                      style={{
                        width: `${(i + 1) * 70}px`,
                        height: `${(i + 1) * 70}px`,
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}
                </div>

                {/* Shine sweep */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 3 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Animated G */}
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="text-[7.5rem] lg:text-[8.5rem] font-black bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-none select-none"
                >
                  G
                </motion.span>
              </div>

              {/* Floating badges */}
              {floatingBadges.map((b) => (
                <motion.div
                  key={b.text}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, ...b.anim }}
                  transition={{
                    opacity: { delay: 0.8 + b.delay * 0.2, duration: 0.4 },
                    scale: { delay: 0.8 + b.delay * 0.2, duration: 0.4, type: 'spring' },
                    ...(b.anim.y && { y: { repeat: Infinity, duration: b.dur, ease: 'easeInOut', delay: b.delay } }),
                    ...(b.anim.x && { x: { repeat: Infinity, duration: b.dur, ease: 'easeInOut', delay: b.delay } }),
                  }}
                  whileHover={{ scale: 1.1 }}
                  className={`absolute ${b.position} bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/80 px-3.5 py-2.5 flex items-center gap-2 z-10 border border-white cursor-default`}
                >
                  <span className="text-lg">{b.emoji}</span>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap">{b.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-slate-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Soft bottom fade to white — seamless transition to About */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
    </section>
  )
}
