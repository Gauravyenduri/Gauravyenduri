/**
 * Seed script — populates Firestore with all default portfolio data.
 * Run once with:  npm run seed
 *
 * Safe to re-run: skips any collection that already has documents.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, terminate } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBjDuqzVlUra3tGXT0ySN4uqfzIBAuSJRk",
  authDomain: "gaurav-portfolio-7ad50.firebaseapp.com",
  projectId: "gaurav-portfolio-7ad50",
  storageBucket: "gaurav-portfolio-7ad50.firebasestorage.app",
  messagingSenderId: "647439974429",
  appId: "1:647439974429:web:82b41c487721514cbc46f4",
  measurementId: "G-2LBTEB9F6X"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

/* ────────────────────────────────────────────────────
   DEFAULT DATA
──────────────────────────────────────────────────── */

const GH = 'https://github.com/Gauravyenduri'

const projects = [
  {
    title: 'AI-Powered Enterprise Data Intelligence Chatbot',
    description: 'Enterprise AI chatbot backend using FastAPI and SQLAlchemy with LLM-style natural language query generation. Converts plain-English questions into actionable database insights.',
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'LLM', 'AI'],
    gradient: 'from-violet-400 to-purple-600',
    emoji: '🤖',
    category: 'AI / ML',
    github: `${GH}/AI-Powered-Enterprise-Data-Intelligence-Chatbot`,
    live: '#',
    featured: true,
    order: 0,
  },
  {
    title: 'Intelligent Reporting & Insights Tool',
    description: 'Python-based analytics platform that converts raw financial data into actionable insights through automated report generation and visualizations.',
    tags: ['Python', 'Data Analytics', 'Pandas', 'Visualization'],
    gradient: 'from-emerald-400 to-teal-500',
    emoji: '📊',
    category: 'AI / ML',
    github: `${GH}/Intelligent_Reporting_Insights_Tool`,
    live: '#',
    featured: true,
    order: 1,
  },
  {
    title: 'LLM Inference Optimizer',
    description: 'Optimization toolkit for large language model inference, focusing on latency reduction and throughput improvements for production LLM deployments.',
    tags: ['Python', 'LLM', 'Optimization', 'AI/ML'],
    gradient: 'from-indigo-400 to-blue-500',
    emoji: '⚡',
    category: 'AI / ML',
    github: `${GH}/llm-inference-optimizer`,
    live: '#',
    featured: false,
    order: 2,
  },
  {
    title: 'Low-Light Image Enhancement',
    description: 'Deep learning-based pipeline for enhancing images captured in low-light conditions, improving visibility and quality for downstream computer vision tasks.',
    tags: ['Python', 'Computer Vision', 'Deep Learning', 'OpenCV'],
    gradient: 'from-amber-400 to-orange-500',
    emoji: '🌙',
    category: 'Computer Vision',
    github: `${GH}/Low-Light-Image-Enhancement`,
    live: '#',
    featured: false,
    order: 3,
  },
  {
    title: 'YOLO Object Detection (Java)',
    description: 'Java-based integration of YOLO for real-time object detection, used as foundation for computer vision pipelines including the bird behavior monitoring system at Aican Automate.',
    tags: ['Java', 'YOLOv4', 'Computer Vision', 'Real-time'],
    gradient: 'from-lime-400 to-green-500',
    emoji: '👁️',
    category: 'Computer Vision',
    github: `${GH}/Yolo-java-master`,
    live: '#',
    featured: false,
    order: 4,
  },
  {
    title: 'Intelligent Fleet & Delivery Optimization',
    description: 'Real-time fleet management with live GPS tracking, automated route optimization, predictive maintenance alerts, and driver performance scoring. 10k+ location updates/min via Kafka & WebSocket.',
    tags: ['Spring Boot', 'Angular', 'Kafka', 'PostgreSQL', 'Google Maps API', 'WebSocket'],
    gradient: 'from-blue-400 to-indigo-500',
    emoji: '🚛',
    category: 'Full Stack',
    github: '#',
    live: '#',
    featured: true,
    order: 5,
  },
  {
    title: 'High-Throughput Payment Gateway',
    description: 'Payment gateway processing 50k+ transactions/minute with 99.99% uptime. JWT auth, Redis caching, and database sharding reduced transaction latency by 40% with full PCI-DSS compliance.',
    tags: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'JWT', 'Docker'],
    gradient: 'from-teal-400 to-emerald-500',
    emoji: '💳',
    category: 'Backend',
    github: '#',
    live: '#',
    featured: true,
    order: 6,
  },
]

const experiences = [
  {
    role: 'Software Engineer',
    company: 'NEXT EDUCATION Pvt Limited',
    duration: 'Jan 2024 – Nov 2024',
    type: 'Full-time',
    location: 'Hyderabad, India',
    color: 'from-indigo-500 to-purple-500',
    dot: 'bg-indigo-500',
    shadow: 'shadow-indigo-100',
    order: 0,
    points: [
      'Led design & development of enterprise-grade microservices using Java Spring Boot, J2EE, and RESTful APIs, reducing API response times by 35%.',
      'Architected modular backend solutions supporting large-scale educational platforms with 10k+ daily active users.',
      'Integrated Angular-based frontends with Spring APIs for seamless, high-performance user experiences.',
      'Optimized database interactions using Hibernate and MySQL, reducing query latency by 40% through caching and indexing.',
      'Championed JWT & OAuth2 authentication with RBAC for multi-tenant systems.',
      'Implemented CI/CD pipelines with Jenkins and Docker, enhancing deployment efficiency.',
    ],
  },
  {
    role: 'Software & Automation Intern',
    company: 'RCI (DRDO) — Indian Government',
    duration: 'Jan 2024 – July 2024',
    type: 'Internship',
    location: 'Hyderabad, India',
    color: 'from-emerald-500 to-teal-500',
    dot: 'bg-emerald-500',
    shadow: 'shadow-emerald-100',
    order: 1,
    points: [
      'Designed and developed an RPA bot to automate repetitive data extraction and migration tasks, cutting manual effort by 50%.',
      'Ensured application resiliency through exception-driven workflows and modular automation logic.',
      'Collaborated with data engineers and system architects to enhance data flow under tight deadlines.',
      'Conducted performance testing to ensure scalability and robustness at enterprise standards.',
    ],
  },
  {
    role: 'AI & Computer Vision Intern',
    company: 'Aican Automate',
    duration: 'Aug 2023 – Dec 2023',
    type: 'Internship',
    location: 'Remote',
    color: 'from-orange-400 to-rose-500',
    dot: 'bg-orange-500',
    shadow: 'shadow-orange-100',
    order: 2,
    points: [
      'Integrated a pretrained YOLOv4 model to monitor rare bird behavior in a zoo with real-time anomaly detection alerts for caretakers.',
      'Stored and managed large-scale activity data in MongoDB for seasonal pattern analysis.',
      'Configured and troubleshot camera systems and sensors for accurate computer vision pipelines.',
    ],
  },
]

const education = [
  {
    degree: 'Masters in Computer Science',
    school: 'University of North Texas',
    location: 'Denton, Texas, USA',
    duration: 'Jan 2025 – Dec 2026',
    grade: 'CGPA: 3.69',
    highlight: 'Current',
    gradient: 'from-indigo-500 to-purple-600',
    light: 'from-indigo-50 to-purple-50',
    glow: 'shadow-indigo-100',
    border: 'border-indigo-100',
    icon: '🎓',
    order: 0,
    courses: ['Data Structures & Algorithms', 'Machine Learning', 'Distributed Systems', 'Cloud Computing'],
  },
  {
    degree: 'Bachelor of Engineering — Computer Science',
    school: 'Osmania University',
    location: 'Hyderabad, India',
    duration: 'Oct 2020 – July 2024',
    grade: 'B.E. in CSE',
    highlight: 'Completed',
    gradient: 'from-emerald-500 to-teal-600',
    light: 'from-emerald-50 to-teal-50',
    glow: 'shadow-emerald-100',
    border: 'border-emerald-100',
    icon: '🏛️',
    order: 1,
    courses: ['OOP', 'Database Management', 'Computer Networks', 'Software Engineering'],
  },
]

const skills = [
  {
    title: 'Backend & Languages',
    icon: '☕',
    gradient: 'from-indigo-500 to-blue-500',
    order: 0,
    skills: ['Java', 'Spring Boot', 'J2EE', 'Python', 'C', 'REST APIs', 'JWT / OAuth2', 'Hibernate / JPA', 'WebSocket', 'Kafka', 'Microservices'],
  },
  {
    title: 'Frontend & Databases',
    icon: '🎨',
    gradient: 'from-purple-500 to-pink-500',
    order: 1,
    skills: ['Angular', 'JavaScript', 'HTML5 / CSS3', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLAlchemy', 'Spring MVC'],
  },
  {
    title: 'DevOps, AI & Cloud',
    icon: '🤖',
    gradient: 'from-emerald-500 to-teal-500',
    order: 2,
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'TensorFlow', 'Scikit-learn', 'YOLOv4 / v5 / v8', 'Pandas', 'RPA', 'Computer Vision', 'Prometheus'],
  },
]

/* ────────────────────────────────────────────────────
   SEED FUNCTION
──────────────────────────────────────────────────── */

async function seedCollection(name, items) {
  const snap = await getDocs(collection(db, name))
  if (!snap.empty) {
    console.log(`  ⏭  "${name}" already has ${snap.size} docs — skipping.`)
    return
  }
  for (const item of items) {
    await addDoc(collection(db, name), { ...item, createdAt: serverTimestamp() })
  }
  console.log(`  ✅  "${name}" — seeded ${items.length} items.`)
}

async function main() {
  console.log('\n🌱  Starting Firestore seed...\n')
  await seedCollection('projects', projects)
  await seedCollection('experiences', experiences)
  await seedCollection('education', education)
  await seedCollection('skills', skills)
  console.log('\n✨  Done! All collections seeded.\n')
  await terminate(db)
  process.exit(0)
}

main().catch(err => {
  console.error('\n❌  Seed failed:', err)
  process.exit(1)
})
