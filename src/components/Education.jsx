import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'


export default function Education() {
  const [education, setEducation] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'education'), orderBy('order'))
    getDocs(q).then(snap => setEducation(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [])

  return (
    <section id="education" className="py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-2">
            Academic Background
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Education</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 mx-auto h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7 }}
              className={`rounded-3xl p-7 bg-gradient-to-br ${edu.light} border ${edu.border} hover:shadow-xl ${edu.glow} transition-all`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center text-3xl shadow-md shrink-0`}
                >
                  {edu.icon}
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    edu.highlight === 'Current'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {edu.highlight === 'Current' && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse mr-1.5 align-middle" />
                  )}
                  {edu.highlight}
                </motion.span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{edu.degree}</h3>
              <motion.p
                className={`font-semibold text-sm bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent mb-1`}
              >
                {edu.school}
              </motion.p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span>📍</span> {edu.location}
                </span>
                <span className="text-slate-300 text-xs">·</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span>📅</span> {edu.duration}
                </span>
              </div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                className="mb-5 px-3 py-2 bg-white/70 rounded-xl border border-white/80 inline-flex items-center gap-2"
              >
                <span className="text-sm">🏅</span>
                <span className="text-sm font-semibold text-slate-700">{edu.grade}</span>
              </motion.div>

              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Relevant Courses</p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((c, ci) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + ci * 0.07 }}
                      whileHover={{ scale: 1.06, y: -1 }}
                      className="px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-slate-600 border border-white/80 shadow-sm"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
