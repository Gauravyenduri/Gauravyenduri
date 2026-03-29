import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'


export default function Experience() {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'experiences'), orderBy('order'))
    getDocs(q).then(snap => setExperiences(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [])

  return (
    <section id="experience" className="py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">Career Path</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Work Experience</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 mx-auto h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-8">
          {/* Animated line that draws in */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-2 bottom-0 w-px bg-gradient-to-b from-indigo-400 via-purple-300 to-transparent origin-top"
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16"
              >
                {/* Animated dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 500 }}
                  className={`absolute left-3.5 top-7 w-5 h-5 rounded-full ${exp.dot} border-4 border-white shadow-md`}
                >
                  {/* Ping ring */}
                  <motion.span
                    animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    className={`absolute inset-0 rounded-full ${exp.dot} opacity-50`}
                  />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 6, boxShadow: '0 10px 40px rgba(99,102,241,0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-md ${exp.shadow} transition-all`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-sm font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.company}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{exp.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500 font-medium">{exp.duration}</span>
                      <motion.span
                        whileHover={{ scale: 1.08 }}
                        className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg"
                      >
                        {exp.type}
                      </motion.span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.points.map((pt, pi) => (
                      <motion.li
                        key={pi}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + pi * 0.06 }}
                        className="flex items-start gap-2.5 text-sm text-slate-500"
                      >
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${exp.dot} shrink-0 opacity-70`} />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom cap */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="relative pl-16 mt-10"
          >
            <div className="absolute left-3.5 top-4 w-5 h-5 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-4 border-white shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <p className="text-sm text-slate-400 font-medium pt-3 pl-2">
              B.E. Computer Science — Osmania University, Hyderabad (Oct 2020 – July 2024)
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
