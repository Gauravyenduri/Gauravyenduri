import { useState } from 'react'
import { motion } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const contactItems = [
  { icon: '📧', label: 'Email', value: 'gauravyenduri19@gmail.com', href: 'mailto:gauravyenduri19@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+1 945-209-8604', href: 'tel:+19452098604' },
  { icon: '📍', label: 'Location', value: 'Texas, USA', href: '#' },
  { icon: '🕐', label: 'Response Time', value: 'Within 24 hours', href: '#' },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Gauravyenduri',
    baseClass: 'bg-slate-700 text-white hover:bg-slate-600',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gaurav-yenduri-37762722a/',
    baseClass: 'bg-blue-600 text-white hover:bg-blue-500',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'messages'), {
        ...form,
        sentAt: serverTimestamp(),
      })
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      console.error('Failed to send message:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all'

  return (
    <section id="contact" className="relative py-28 bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(165,180,252,1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-18"
        >
          <span className="inline-block text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">Let's Talk</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Get In Touch</h2>
          <div className="mt-4 mx-auto w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          <p className="mt-5 text-slate-300 max-w-lg mx-auto text-[15px]">
            Open to full-time roles, internships, and collaborations. Drop me a message and I'll get back within 24 hours!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mt-16">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Let's build something great</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Currently a Masters student at the University of North Texas (Texas, USA).
                Looking for full-time Software Engineering roles or research opportunities starting 2026.
              </p>
            </div>

            <div className="space-y-3">
              {contactItems.map(item => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-indigo-500/40 hover:bg-white/10 transition-all group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-300 mb-3">Connect with me</p>
              <div className="flex gap-2.5">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg ${s.baseClass}`}
                  >
                    <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-400">Available for opportunities</p>
                  <p className="text-xs text-emerald-500/70 mt-0.5">Open to full-time & internship roles · Texas, USA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-800/60 border border-slate-700 rounded-3xl p-8 space-y-5 backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Your Name</label>
                  <input type="text" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputClass} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-200 mb-1.5">Email Address</label>
                  <input type="email" required value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputClass} placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-1.5">Subject</label>
                <input type="text" required value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className={inputClass} placeholder="Job Opportunity / Project Collaboration" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-1.5">Message</label>
                <textarea required rows={5} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  placeholder="Hi Gaurav, I'd love to discuss a Software Engineer role at..." />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all ${
                  sent
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/50 hover:shadow-indigo-800/60'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : sent ? '✓ Message Sent!' : 'Send Message →'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
