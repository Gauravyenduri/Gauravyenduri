import { useState, useEffect } from 'react'
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query,
} from 'firebase/firestore'
import { db } from '../firebase'

const ADMIN_PASS = 'gaurav@2026'

/* ── preset options ─────────────────────────── */
const PROJECT_GRADIENTS = [
  { label: 'Violet → Purple', value: 'from-violet-400 to-purple-600' },
  { label: 'Blue → Indigo',   value: 'from-blue-400 to-indigo-600' },
  { label: 'Green → Emerald', value: 'from-green-400 to-emerald-600' },
  { label: 'Orange → Red',    value: 'from-orange-400 to-red-500' },
  { label: 'Pink → Rose',     value: 'from-pink-400 to-rose-600' },
  { label: 'Cyan → Blue',     value: 'from-cyan-400 to-blue-600' },
  { label: 'Indigo → Purple', value: 'from-indigo-500 to-purple-600' },
]
const EXP_COLORS = [
  { label: 'Indigo → Purple',  color: 'from-indigo-500 to-purple-500',  dot: 'bg-indigo-500',  shadow: 'shadow-indigo-100' },
  { label: 'Emerald → Teal',   color: 'from-emerald-500 to-teal-500',   dot: 'bg-emerald-500', shadow: 'shadow-emerald-100' },
  { label: 'Orange → Rose',    color: 'from-orange-400 to-rose-500',    dot: 'bg-orange-500',  shadow: 'shadow-orange-100' },
  { label: 'Blue → Cyan',      color: 'from-blue-500 to-cyan-500',      dot: 'bg-blue-500',    shadow: 'shadow-blue-100' },
  { label: 'Purple → Pink',    color: 'from-purple-500 to-pink-500',    dot: 'bg-purple-500',  shadow: 'shadow-purple-100' },
]
const EDU_THEMES = [
  { label: 'Indigo',  gradient: 'from-indigo-500 to-purple-600',  light: 'from-indigo-50 to-purple-50',  glow: 'shadow-indigo-100',  border: 'border-indigo-100' },
  { label: 'Emerald', gradient: 'from-emerald-500 to-teal-600',   light: 'from-emerald-50 to-teal-50',   glow: 'shadow-emerald-100', border: 'border-emerald-100' },
  { label: 'Rose',    gradient: 'from-rose-500 to-pink-600',      light: 'from-rose-50 to-pink-50',      glow: 'shadow-rose-100',    border: 'border-rose-100' },
  { label: 'Blue',    gradient: 'from-blue-500 to-indigo-600',    light: 'from-blue-50 to-indigo-50',    glow: 'shadow-blue-100',    border: 'border-blue-100' },
]
const CATEGORIES = ['All', 'AI / ML', 'Backend', 'Full Stack', 'Computer Vision', 'Tools']

/* ── empty form states ───────────────────────── */
const emptyProject = {
  title: '', description: '', emoji: '🚀', category: 'Full Stack',
  github: '', live: '#', tags: '', gradient: PROJECT_GRADIENTS[0].value, featured: false,
}
const emptyExperience = {
  role: '', company: '', duration: '', type: 'Full-time', location: '',
  colorIdx: 0, points: '',
}
const emptyEducation = {
  degree: '', school: '', location: '', duration: '',
  grade: '', highlight: 'Completed', icon: '🎓', courses: '', themeIdx: 0,
}
const emptySkillGroup = { title: '', icon: '⚡', skills: '' }

/* ── helper ──────────────────────────────────── */
const arr = v => (typeof v === 'string' ? v.split('\n').map(s => s.trim()).filter(Boolean) : v || [])

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
function Modal({ title, onClose, onSave, saving, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">✕</button>
        </div>
        <div className="overflow-y-auto px-6 py-5 flex-1 space-y-4">{children}</div>
        <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onSave} disabled={saving} className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60 transition-colors flex items-center gap-2">
            {saving && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── shared form field ───────────────────────── */
const Field = ({ label, children, hint }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
    {children}
    {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
  </div>
)
const Input = (props) => <input {...props} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" />
const Textarea = (props) => <textarea {...props} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none" />
const Select = ({ children, ...props }) => (
  <select {...props} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 transition-all bg-white">
    {children}
  </select>
)

/* ══════════════════════════════════════════════
   CONFIRM DELETE
══════════════════════════════════════════════ */
function ConfirmDelete({ label, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 text-2xl">🗑️</div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete this item?</h3>
        <p className="text-sm text-slate-500 mb-6">"{label}" will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════ */
function SectionHeader({ title, count, onAdd }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-400 mt-0.5">{count} {count === 1 ? 'item' : 'items'}</p>
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
          <span className="text-lg leading-none">+</span> Add New
        </button>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════ */
function ProjectsSection() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyProject)
  const [saving, setSaving] = useState(false)
  const [del, setDel] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'projects'))
    return onSnapshot(q, snap => setItems(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [])

  const openAdd = () => { setForm(emptyProject); setModal('add') }
  const openEdit = item => {
    setForm({ ...item, tags: arr(item.tags).join('\n') })
    setModal('edit')
  }

  const save = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    const payload = { ...form, tags: arr(form.tags), updatedAt: serverTimestamp() }
    try {
      if (modal === 'edit') await updateDoc(doc(db, 'projects', form.id), payload)
      else await addDoc(collection(db, 'projects'), { ...payload, createdAt: serverTimestamp() })
      setModal(null)
    } finally { setSaving(false) }
  }

  const remove = async () => {
    await deleteDoc(doc(db, 'projects', del.id))
    setDel(null)
  }

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <SectionHeader title="Projects" count={items.length} onAdd={openAdd} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.gradient}`} />
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">{item.category}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2">{item.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.description}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {arr(item.tags).slice(0, 3).map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{t}</span>
              ))}
              {arr(item.tags).length > 3 && <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">+{arr(item.tags).length - 3}</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-colors">Edit</button>
              <button onClick={() => setDel(item)} className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <Empty label="No projects yet. Click Add New to get started." />}

      {modal && (
        <Modal title={modal === 'add' ? 'Add Project' : 'Edit Project'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Emoji"><Input value={form.emoji} onChange={e => f('emoji', e.target.value)} placeholder="🚀" /></Field>
            <Field label="Category">
              <Select value={form.category} onChange={e => f('category', e.target.value)}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Title"><Input value={form.title} onChange={e => f('title', e.target.value)} placeholder="Project name" /></Field>
          <Field label="Description"><Textarea rows={3} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Short description…" /></Field>
          <Field label="Tags" hint="One tag per line"><Textarea rows={4} value={form.tags} onChange={e => f('tags', e.target.value)} placeholder={"React\nNode.js\nFirebase"} /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="GitHub URL"><Input value={form.github} onChange={e => f('github', e.target.value)} placeholder="https://github.com/…" /></Field>
            <Field label="Live URL"><Input value={form.live} onChange={e => f('live', e.target.value)} placeholder="#" /></Field>
          </div>
          <Field label="Card Gradient">
            <Select value={form.gradient} onChange={e => f('gradient', e.target.value)}>
              {PROJECT_GRADIENTS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </Select>
          </Field>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => f('featured', e.target.checked)} className="w-4 h-4 rounded accent-indigo-600" />
            <span className="text-sm text-slate-700 font-medium">Featured project</span>
          </label>
        </Modal>
      )}
      {del && <ConfirmDelete label={del.title} onConfirm={remove} onCancel={() => setDel(null)} />}
    </div>
  )
}

/* ══════════════════════════════════════════════
   EXPERIENCE SECTION
══════════════════════════════════════════════ */
function ExperienceSection() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyExperience)
  const [saving, setSaving] = useState(false)
  const [del, setDel] = useState(null)

  useEffect(() => {
    return onSnapshot(collection(db, 'experiences'), snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 99) - (b.order ?? 99)))
    )
  }, [])

  const openAdd = () => { setForm({ ...emptyExperience }); setModal('add') }
  const openEdit = item => {
    const colorIdx = EXP_COLORS.findIndex(c => c.color === item.color) ?? 0
    setForm({ ...item, points: arr(item.points).join('\n'), colorIdx: colorIdx >= 0 ? colorIdx : 0 })
    setModal('edit')
  }

  const save = async () => {
    if (!form.role.trim()) return
    setSaving(true)
    const color = EXP_COLORS[form.colorIdx]
    const payload = {
      role: form.role, company: form.company, duration: form.duration,
      type: form.type, location: form.location,
      color: color.color, dot: color.dot, shadow: color.shadow,
      points: arr(form.points), order: Number(form.order ?? 0), updatedAt: serverTimestamp(),
    }
    try {
      if (modal === 'edit') await updateDoc(doc(db, 'experiences', form.id), payload)
      else await addDoc(collection(db, 'experiences'), { ...payload, createdAt: serverTimestamp() })
      setModal(null)
    } finally { setSaving(false) }
  }

  const remove = async () => { await deleteDoc(doc(db, 'experiences', del.id)); setDel(null) }
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <SectionHeader title="Work Experience" count={items.length} onAdd={openAdd} />
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
              {item.company?.[0] ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-bold text-slate-800 text-sm">{item.role}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{item.type}</span>
              </div>
              <p className="text-sm text-indigo-600 font-semibold">{item.company}</p>
              <p className="text-xs text-slate-400">{item.duration} · {item.location}</p>
              <p className="text-xs text-slate-500 mt-1">{arr(item.points).length} bullet points</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100">Edit</button>
              <button onClick={() => setDel(item)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <Empty label="No experience entries yet." />}

      {modal && (
        <Modal title={modal === 'add' ? 'Add Experience' : 'Edit Experience'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Job Title"><Input value={form.role} onChange={e => f('role', e.target.value)} placeholder="Software Engineer" /></Field>
            <Field label="Company"><Input value={form.company} onChange={e => f('company', e.target.value)} placeholder="Company Name" /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Duration"><Input value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="Jan 2024 – Dec 2024" /></Field>
            <Field label="Type">
              <Select value={form.type} onChange={e => f('type', e.target.value)}>
                {['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Location"><Input value={form.location} onChange={e => f('location', e.target.value)} placeholder="City, Country" /></Field>
            <Field label="Display Order"><Input type="number" value={form.order ?? 0} onChange={e => f('order', e.target.value)} placeholder="0" /></Field>
          </div>
          <Field label="Color Theme">
            <Select value={form.colorIdx} onChange={e => f('colorIdx', Number(e.target.value))}>
              {EXP_COLORS.map((c, i) => <option key={i} value={i}>{c.label}</option>)}
            </Select>
          </Field>
          <Field label="Bullet Points" hint="One point per line">
            <Textarea rows={6} value={form.points} onChange={e => f('points', e.target.value)} placeholder={"Led development of microservices…\nOptimized database queries…"} />
          </Field>
        </Modal>
      )}
      {del && <ConfirmDelete label={`${del.role} @ ${del.company}`} onConfirm={remove} onCancel={() => setDel(null)} />}
    </div>
  )
}

/* ══════════════════════════════════════════════
   EDUCATION SECTION
══════════════════════════════════════════════ */
function EducationSection() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptyEducation)
  const [saving, setSaving] = useState(false)
  const [del, setDel] = useState(null)

  useEffect(() => {
    return onSnapshot(collection(db, 'education'), snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
  }, [])

  const openAdd = () => { setForm({ ...emptyEducation }); setModal('add') }
  const openEdit = item => {
    const themeIdx = EDU_THEMES.findIndex(t => t.gradient === item.gradient)
    setForm({ ...item, courses: arr(item.courses).join('\n'), themeIdx: themeIdx >= 0 ? themeIdx : 0 })
    setModal('edit')
  }

  const save = async () => {
    if (!form.degree.trim()) return
    setSaving(true)
    const theme = EDU_THEMES[form.themeIdx]
    const payload = {
      degree: form.degree, school: form.school, location: form.location,
      duration: form.duration, grade: form.grade, highlight: form.highlight, icon: form.icon,
      courses: arr(form.courses),
      gradient: theme.gradient, light: theme.light, glow: theme.glow, border: theme.border,
      updatedAt: serverTimestamp(),
    }
    try {
      if (modal === 'edit') await updateDoc(doc(db, 'education', form.id), payload)
      else await addDoc(collection(db, 'education'), { ...payload, createdAt: serverTimestamp() })
      setModal(null)
    } finally { setSaving(false) }
  }

  const remove = async () => { await deleteDoc(doc(db, 'education', del.id)); setDel(null) }
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <SectionHeader title="Education" count={items.length} onAdd={openAdd} />
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className={`bg-gradient-to-br ${item.light ?? 'from-indigo-50 to-purple-50'} border ${item.border ?? 'border-indigo-100'} rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.highlight === 'Current' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>{item.highlight}</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-0.5">{item.degree}</h4>
            <p className="text-indigo-600 font-semibold text-sm">{item.school}</p>
            <p className="text-xs text-slate-400 mb-3">{item.duration} · {item.grade}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 rounded-lg bg-white/70 text-indigo-600 text-xs font-semibold hover:bg-white">Edit</button>
              <button onClick={() => setDel(item)} className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <Empty label="No education entries yet." />}

      {modal && (
        <Modal title={modal === 'add' ? 'Add Education' : 'Edit Education'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Icon Emoji"><Input value={form.icon} onChange={e => f('icon', e.target.value)} placeholder="🎓" /></Field>
            <Field label="Status">
              <Select value={form.highlight} onChange={e => f('highlight', e.target.value)}>
                {['Current', 'Completed'].map(s => <option key={s}>{s}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Degree / Program"><Input value={form.degree} onChange={e => f('degree', e.target.value)} placeholder="Masters in Computer Science" /></Field>
          <Field label="School / University"><Input value={form.school} onChange={e => f('school', e.target.value)} placeholder="University Name" /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Location"><Input value={form.location} onChange={e => f('location', e.target.value)} placeholder="City, State, Country" /></Field>
            <Field label="Duration"><Input value={form.duration} onChange={e => f('duration', e.target.value)} placeholder="Jan 2025 – Dec 2026" /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Grade / CGPA"><Input value={form.grade} onChange={e => f('grade', e.target.value)} placeholder="CGPA: 3.69" /></Field>
            <Field label="Color Theme">
              <Select value={form.themeIdx} onChange={e => f('themeIdx', Number(e.target.value))}>
                {EDU_THEMES.map((t, i) => <option key={i} value={i}>{t.label}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Relevant Courses" hint="One course per line">
            <Textarea rows={4} value={form.courses} onChange={e => f('courses', e.target.value)} placeholder={"Machine Learning\nDistributed Systems"} />
          </Field>
        </Modal>
      )}
      {del && <ConfirmDelete label={del.degree} onConfirm={remove} onCancel={() => setDel(null)} />}
    </div>
  )
}

/* ══════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════ */
function SkillsSection() {
  const [items, setItems] = useState([])
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(emptySkillGroup)
  const [saving, setSaving] = useState(false)
  const [del, setDel] = useState(null)

  useEffect(() => {
    return onSnapshot(collection(db, 'skills'), snap =>
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
  }, [])

  const openAdd = () => { setForm({ ...emptySkillGroup }); setModal('add') }
  const openEdit = item => {
    setForm({ ...item, skills: arr(item.skills).join('\n') })
    setModal('edit')
  }

  const save = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    const payload = { title: form.title, icon: form.icon, skills: arr(form.skills), updatedAt: serverTimestamp() }
    try {
      if (modal === 'edit') await updateDoc(doc(db, 'skills', form.id), payload)
      else await addDoc(collection(db, 'skills'), { ...payload, createdAt: serverTimestamp() })
      setModal(null)
    } finally { setSaving(false) }
  }

  const remove = async () => { await deleteDoc(doc(db, 'skills', del.id)); setDel(null) }
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div>
      <SectionHeader title="Skill Groups" count={items.length} onAdd={openAdd} />
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-bold text-slate-800 text-sm">{item.title}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {arr(item.skills).map(s => (
                <span key={s} className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-medium">{s}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(item)} className="flex-1 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100">Edit</button>
              <button onClick={() => setDel(item)} className="flex-1 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <Empty label="No skill groups yet." />}

      {modal && (
        <Modal title={modal === 'add' ? 'Add Skill Group' : 'Edit Skill Group'} onClose={() => setModal(null)} onSave={save} saving={saving}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Group Name"><Input value={form.title} onChange={e => f('title', e.target.value)} placeholder="Backend & Languages" /></Field>
            <Field label="Icon Emoji"><Input value={form.icon} onChange={e => f('icon', e.target.value)} placeholder="☕" /></Field>
          </div>
          <Field label="Skills" hint="One skill per line">
            <Textarea rows={8} value={form.skills} onChange={e => f('skills', e.target.value)} placeholder={"Java\nSpring Boot\nPython\nREST APIs"} />
          </Field>
        </Modal>
      )}
      {del && <ConfirmDelete label={del.title} onConfirm={remove} onCancel={() => setDel(null)} />}
    </div>
  )
}

/* ══════════════════════════════════════════════
   MESSAGES SECTION
══════════════════════════════════════════════ */
function MessagesSection() {
  const [items, setItems] = useState([])
  const [del, setDel] = useState(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('sentAt', 'desc'))
    return onSnapshot(q, snap => setItems(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
  }, [])

  const remove = async () => { await deleteDoc(doc(db, 'messages', del.id)); setDel(null) }

  const fmt = ts => ts?.toDate ? ts.toDate().toLocaleString() : '—'

  return (
    <div>
      <SectionHeader title="Contact Messages" count={items.length} />
      <div className="space-y-3">
        {items.map(m => (
          <div key={m.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0">
                {m.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{m.name}</p>
                <p className="text-xs text-slate-400 truncate">{m.email} · {m.subject}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-slate-400">{fmt(m.sentAt)}</p>
                <span className="text-slate-300 text-xs">{expanded === m.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {expanded === m.id && (
              <div className="px-5 pb-4 border-t border-slate-50">
                <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{m.message}</p>
                <div className="flex gap-2 mt-4">
                  <a href={`mailto:${m.email}`} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-colors">Reply via Email</a>
                  <button onClick={() => setDel(m)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {items.length === 0 && <Empty label="No messages yet. They'll appear here when someone submits the contact form." />}
      {del && <ConfirmDelete label={`Message from ${del.name}`} onConfirm={remove} onCancel={() => setDel(null)} />}
    </div>
  )
}

/* ── empty state ─────────────────────────────── */
function Empty({ label }) {
  return (
    <div className="text-center py-16 text-slate-400">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-sm">{label}</p>
    </div>
  )
}

/* ══════════════════════════════════════════════
   DASHBOARD OVERVIEW
══════════════════════════════════════════════ */
function Dashboard({ counts }) {
  const tiles = [
    { label: 'Projects',   icon: '🚀', count: counts.projects,    color: 'from-indigo-500 to-purple-600', section: 'projects' },
    { label: 'Experience', icon: '💼', count: counts.experiences,  color: 'from-emerald-500 to-teal-600',  section: 'experiences' },
    { label: 'Education',  icon: '🎓', count: counts.education,    color: 'from-orange-400 to-rose-500',   section: 'education' },
    { label: 'Skills',     icon: '⚡', count: counts.skills,       color: 'from-blue-500 to-cyan-600',     section: 'skills' },
    { label: 'Messages',   icon: '📩', count: counts.messages,     color: 'from-pink-500 to-rose-600',     section: 'messages' },
  ]
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
        {tiles.map(t => (
          <div key={t.label} className={`rounded-2xl p-5 bg-gradient-to-br ${t.color} text-white shadow-sm`}>
            <div className="text-3xl mb-3">{t.icon}</div>
            <div className="text-3xl font-black">{t.count}</div>
            <div className="text-sm font-semibold opacity-90 mt-0.5">{t.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
        <p className="text-sm font-semibold text-indigo-700">💡 Tip</p>
        <p className="text-sm text-indigo-600 mt-1">All changes here update your live portfolio instantly. Use the sidebar to manage each section.</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN ADMIN
══════════════════════════════════════════════ */
const NAV = [
  { id: 'dashboard',   label: 'Dashboard',  icon: '🏠' },
  { id: 'projects',    label: 'Projects',   icon: '🚀' },
  { id: 'experiences', label: 'Experience', icon: '💼' },
  { id: 'education',   label: 'Education',  icon: '🎓' },
  { id: 'skills',      label: 'Skills',     icon: '⚡' },
  { id: 'messages',    label: 'Messages',   icon: '📩' },
]

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('admin') === '1')
  const [password, setPassword] = useState('')
  const [authErr, setAuthErr] = useState(false)
  const [section, setSection] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(false)
  const [counts, setCounts] = useState({ projects: 0, experiences: 0, education: 0, skills: 0, messages: 0 })

  /* live counts for dashboard */
  useEffect(() => {
    if (!loggedIn) return
    const unsubs = Object.keys(counts).map(col =>
      onSnapshot(collection(db, col), snap => setCounts(p => ({ ...p, [col]: snap.size })))
    )
    return () => unsubs.forEach(u => u())
  }, [loggedIn])

  const login = e => {
    e.preventDefault()
    if (password === ADMIN_PASS) {
      sessionStorage.setItem('admin', '1')
      setLoggedIn(true)
    } else {
      setAuthErr(true)
      setTimeout(() => setAuthErr(false), 2500)
    }
  }

  const logout = () => { sessionStorage.removeItem('admin'); setLoggedIn(false) }

  /* ── login screen ── */
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">G</div>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 text-center mb-1">Admin Panel</h1>
          <p className="text-sm text-slate-400 text-center mb-8">Gaurav's Portfolio Manager</p>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all mb-4 ${authErr ? 'border-red-400 focus:ring-red-100 bg-red-50' : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-100'}`}
          />
          {authErr && <p className="text-xs text-red-500 mb-3 text-center font-medium">Incorrect password. Try again.</p>}
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            Login →
          </button>
        </form>
      </div>
    )
  }

  /* ── main admin UI ── */
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar overlay (mobile) */}
      {sideOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSideOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg">G</div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-slate-400 text-[11px]">Portfolio Manager</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => { setSection(n.id); setSideOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                section === n.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base">{n.icon}</span>
              {n.label}
              {n.id !== 'dashboard' && counts[n.id] > 0 && (
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${section === n.id ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300'}`}>
                  {counts[n.id]}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-4">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white text-sm font-medium transition-all">
            <span>🚪</span> Logout
          </button>
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white text-sm font-medium transition-all">
            <span>🌐</span> View Portfolio
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center px-5 gap-4 sticky top-0 z-20">
          <button onClick={() => setSideOpen(!sideOpen)} className="lg:hidden w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-colors">
            <span className="text-lg">☰</span>
          </button>
          <h1 className="font-bold text-slate-800 text-lg capitalize">{section}</h1>
          <div className="ml-auto flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live sync enabled
          </div>
        </header>

        {/* Section content */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto">
          {section === 'dashboard'   && <Dashboard counts={counts} />}
          {section === 'projects'    && <ProjectsSection />}
          {section === 'experiences' && <ExperienceSection />}
          {section === 'education'   && <EducationSection />}
          {section === 'skills'      && <SkillsSection />}
          {section === 'messages'    && <MessagesSection />}
        </main>
      </div>
    </div>
  )
}
