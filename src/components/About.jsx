import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Animated counter ── */
function Counter({ to, prefix = '', suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(parseFloat((eased * to).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, to, decimals])

  return (
    <span ref={ref}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  )
}

const stats = [
  { to: 3.69, prefix: '', suffix: '', decimals: 2, label: 'Masters CGPA @ UNT', icon: '🎓' },
  { to: 3, prefix: '', suffix: '+', decimals: 0, label: 'Professional Roles', icon: '💼' },
  { to: 10, prefix: '', suffix: '+', decimals: 0, label: 'Projects Built', icon: '🚀' },
  { to: 35, prefix: '', suffix: '%', decimals: 0, label: 'API Perf. Improved', icon: '⚡' },
]

const activities = [
  { title: 'CSSA Digital Head', desc: 'Boosted online engagement by 20%, grew followers by 500, led team of 8.' },
  { title: 'Street Cause MVSR — President', desc: 'Contributed to well-being of 300+ individuals through donations and support.' },
  { title: 'Indian Students Association — UNT', desc: 'Organized cultural events: Mix & Mingle, Dandiya Night, Holi Celebration.' },
]

export default function About() {
  return (
    <section id="about" className="py-28 bg-white overflow-hidden relative">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative gradient blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-violet-100 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Who I Am
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">About Me</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 mx-auto h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-indigo-50/80 to-purple-50/60 rounded-3xl" />
            <div className="relative w-full max-w-sm">
              {/* Main card */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative w-full h-72 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100/60 border-4 border-white"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
                {/* Animated shine */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="text-8xl font-black leading-none"
                  >
                    G
                  </motion.span>
                  <span className="text-xl font-bold mt-2 opacity-95">Gaurav Sai Nitin</span>
                  <span className="text-sm opacity-70 mt-1 px-6 text-center">Software Developer · AI Enthusiast</span>
                  <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
                    <span className="text-sm">📍</span>
                    <span className="text-sm font-semibold">Texas, USA</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating CGPA badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.08, rotate: 3 }}
                className="absolute -bottom-5 -right-5 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-4 shadow-xl shadow-indigo-200/60"
              >
                <div className="text-2xl font-black">3.69</div>
                <div className="text-xs font-medium opacity-90 leading-tight">Masters<br/>CGPA @ UNT</div>
              </motion.div>

              {/* Floating top badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
                animate={{ y: [0, -6, 0] }}
                className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">☕</span>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Java / Spring Boot</div>
                    <div className="text-xs text-slate-400">Backend Specialist</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5 leading-snug">
              Software Developer based in{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Texas, USA 🇺🇸
              </span>
            </h3>

            <p className="text-slate-500 leading-relaxed mb-4 text-[15px]">
              Detail-oriented and results-driven Software Developer with hands-on experience in full-stack
              development using Java Spring Boot, Angular, MySQL, and RESTful APIs. Strong background in
              building scalable web applications and automation tools focused on performance and security.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8 text-[15px]">
              Currently pursuing a Masters in Computer Science at UNT (CGPA: 3.69). Proven ability to lead
              cross-functional teams on projects involving computer vision, deep learning, and RPA. Passionate
              about delivering high-quality, impactful code.
            </p>

            {/* Animated Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-9">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                      className="text-lg"
                    >
                      {s.icon}
                    </motion.span>
                    <span className="text-lg font-extrabold text-indigo-600">
                      <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <motion.a
                href="mailto:gauravyenduri19@gmail.com"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-shadow flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                Let's Talk
              </motion.a>
            </div>

            {/* Activities */}
            <div>
              <p className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Activities & Leadership</p>
              <div className="space-y-2.5">
                {activities.map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.8 }}
                      className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

