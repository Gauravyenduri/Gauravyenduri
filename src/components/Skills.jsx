import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import WaveDivider from './WaveDivider'

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const chipVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

// Visual mappings for skill groups (keyed by order index)
const VISUAL = [
  { gradient: 'from-indigo-500 to-blue-500',  dot: 'bg-indigo-400' },
  { gradient: 'from-purple-500 to-pink-500',  dot: 'bg-purple-400' },
  { gradient: 'from-emerald-500 to-teal-500', dot: 'bg-emerald-400' },
  { gradient: 'from-orange-500 to-rose-500',  dot: 'bg-orange-400' },
  { gradient: 'from-blue-500 to-cyan-500',    dot: 'bg-blue-400' },
]

export default function Skills() {
  const [groups, setGroups] = useState([])
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'skills'), orderBy('order'))
    getDocs(q).then(snap => setGroups(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [])

  return (
    <section id="skills" className="relative pt-4 pb-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(165,180,252,1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Background glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-80 h-80 bg-indigo-600 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-600 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-28">

        {/* Header */}
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
            className="inline-block text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Expertise
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">My Skills</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 mx-auto h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
          <p className="mt-5 text-slate-400 max-w-xl mx-auto text-[15px]">
            Technologies and tools used across enterprise systems, AI/ML research, and personal projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {groups.map((g, gi) => {
            const vis = VISUAL[gi % VISUAL.length]
            return (
            <motion.div
              key={g.id ?? g.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-3xl p-7 bg-white/[0.05] backdrop-blur-sm border border-white/10 hover:border-indigo-500/40 hover:shadow-2xl transition-all duration-300"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${g.gradient ?? vis.gradient} flex items-center justify-center text-2xl shadow-lg`}
                >
                  {g.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-slate-200">{g.title}</h3>
              </div>

              {/* Chips */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {(Array.isArray(g.skills) ? g.skills : []).map(skill => (
                  <motion.span
                    key={skill}
                    variants={chipVariants}
                    whileHover={{ scale: 1.08, y: -2, boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHovered(skill)}
                    onHoverEnd={() => setHovered(null)}
                    className="relative px-3.5 py-1.5 bg-white/10 rounded-xl text-sm font-medium text-slate-300 border border-white/15 hover:border-indigo-400/60 hover:text-indigo-300 transition-colors cursor-default overflow-hidden"
                  >
                    {hovered === skill && (
                      <motion.span
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent skew-x-12"
                      />
                    )}
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: gi * 0.4 }}
                    className={`w-2 h-2 rounded-full ${vis.dot}`}
                  />
                  {(Array.isArray(g.skills) ? g.skills : []).length} technologies
                </div>
              </div>
            </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-5 rounded-2xl bg-white/[0.05] border border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-2xl"
              >
                🏅
              </motion.span>
              <div>
                <p className="font-bold text-slate-200 text-sm">Certifications</p>
                <p className="text-slate-500 text-xs">Verified credentials & course completions</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Udemy — Java', 'CLA — C Programming', 'Python (Coursera)', 'Algorithms (Coursera)'].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-indigo-300 border border-indigo-500/30 shadow-sm"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave out → back to white */}
      <WaveDivider fill="white" bg="#0f172a" />
    </section>
  )
}
