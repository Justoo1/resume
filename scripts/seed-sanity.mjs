/**
 * Sanity Multi-Locale Seed Script
 * Populates all 4 locales (en, fr, es, de) from portfolio_content.json
 *
 * Usage:
 *   SANITY_API_TOKEN=<write-token> node scripts/seed-sanity.mjs
 *   SANITY_API_TOKEN=<write-token> node scripts/seed-sanity.mjs --locale en
 *   SANITY_API_TOKEN=<write-token> node scripts/seed-sanity.mjs --replace
 *
 * Flags:
 *   --locale <code>   Seed a single locale only (en | fr | es | de)
 *   --replace         Overwrite existing documents (default: skip existing)
 *
 * What gets translated per locale:
 *   personalInfo     → title, summary
 *   workExperience   → position title, description (translated summary + EN responsibilities)
 *   projects         → description
 *   education        → degree name, field of study
 *   skills           → same across all locales (technical names are universal)
 *   certifications   → same across all locales
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const FORCE_REPLACE = process.argv.includes('--replace')
const localeFlag = (() => {
  const idx = process.argv.indexOf('--locale')
  return idx !== -1 ? process.argv[idx + 1] : null
})()
const ALL_LOCALES = ['en', 'fr', 'es', 'de']
const LOCALES_TO_SEED = localeFlag ? [localeFlag] : ALL_LOCALES

// ---------------------------------------------------------------------------
// Load .env.local
// ---------------------------------------------------------------------------
function loadEnv() {
  try {
    const envPath = resolve(__dirname, '../.env.local')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch { /* rely on shell env vars */ }
}

loadEnv()

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const TOKEN      = process.env.SANITY_API_TOKEN

if (!PROJECT_ID) { console.error('ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.'); process.exit(1) }
if (!TOKEN)      { console.error('ERROR: SANITY_API_TOKEN is not set. Create a write token at sanity.io/manage.'); process.exit(1) }

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Load source data
// ---------------------------------------------------------------------------
const DATA_PATH = resolve(__dirname, '../portfolio_content.json')
let src
try {
  src = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
} catch {
  console.error(`ERROR: Could not read portfolio_content.json at ${DATA_PATH}`)
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50)
}

function toBlock(text, key) {
  return {
    _type: 'block', _key: key,
    style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `s_${key}`, text, marks: [] }],
  }
}

function boldBlock(text, key) {
  return {
    _type: 'block', _key: key,
    style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: `s_${key}`, text, marks: ['strong'] }],
  }
}

/**
 * Build PortableText for work experience.
 * EN  → full responsibilities + achievements blocks.
 * Other locales → translated summary as intro, then EN responsibilities.
 */
function buildDescription(job, locale, localisedJob) {
  const blocks = []

  if (locale !== 'en' && localisedJob?.summary) {
    blocks.push(toBlock(localisedJob.summary, 'summary'))
    blocks.push(boldBlock('— Responsibilities —', 'hr'))
  } else {
    blocks.push(boldBlock('Responsibilities', 'hdr_resp'))
  }

  job.responsibilities?.forEach((line, i) => {
    blocks.push(toBlock(`• ${line}`, `resp${i}`))
  })

  if (job.achievements?.length) {
    blocks.push(boldBlock('Key Achievements', 'hdr_ach'))
    job.achievements.forEach((line, i) => {
      blocks.push(toBlock(`✓ ${line}`, `ach${i}`))
    })
  }

  return blocks
}

const CATEGORY_MAP = {
  'Frontend':         'frontend',
  'Backend':          'backend',
  'AI / ML':          'ai',
  'DevOps & Cloud':   'devops',
  'Databases':        'database',
  'Enterprise & ERP': 'enterprise',
}

/**
 * Commit an array of docs in a single transaction.
 * New docs → tx.create(); existing docs → tx.createOrReplace() if --replace, else skipped.
 * labelFn(doc) returns the human-readable string for console output.
 */
async function commitBatch(docs, existingIds, labelFn) {
  const tx = client.transaction()
  let writes = 0

  for (const doc of docs) {
    if (existingIds.has(doc._id)) {
      if (FORCE_REPLACE) { tx.createOrReplace(doc); writes++ }
    } else {
      tx.create(doc); writes++
    }
  }

  if (writes > 0) await tx.commit()

  for (const doc of docs) {
    const status = existingIds.has(doc._id)
      ? (FORCE_REPLACE ? '↺ replaced' : '→ skipped (exists)')
      : '✓ created'
    console.log(`  ${status}: ${labelFn(doc)}`)
  }
}

// ---------------------------------------------------------------------------
// Translations
// Translatable fields: personalInfo (title, summary), workExperience (position,
// summary), projects (description), education (degree, field).
// Skills + certifications are intentionally identical across all locales.
// ---------------------------------------------------------------------------
const LOCALE_CONTENT = {

  en: {
    personalInfo: {
      title:   src.profile.title,
      summary: src.profile.bio_short,
      bioLong: src.profile.bio_long,
    },
    jobs: src.work_experience.map(j => ({ position: j.title, summary: j.summary })),
    projects: src.projects.map(p => ({ description: p.description })),
    education: [
      { degree: 'BSc. Computer Science',                                              field: 'Computer Science' },
      { degree: 'Professional Diploma, Computer Networking (Microsoft / Cisco CCNA)', field: 'Computer Networking' },
    ],
  },

  // ── FRENCH ────────────────────────────────────────────────────────────────
  fr: {
    personalInfo: {
      title:   "Ingénieur Full-Stack Senior & Chef d'Équipe Technique",
      summary: "Ingénieur Full-Stack Senior avec plus de 6 ans d'expérience dans la conception et la livraison d'applications en production en Afrique, aux États-Unis, aux Émirats arabes unis et en Australie. Spécialisé dans les écosystèmes Python et React/Next.js, je dirige des équipes d'ingénieurs à travers des migrations architecturales complexes et intègre l'IA pour résoudre de véritables problèmes opérationnels.",
    },
    jobs: [
      {
        position: "Ingénieur Logiciel Principal / Chef d'Équipe Technique",
        summary:  "Direction d'une équipe d'ingénieurs intercontinentale dans une migration majeure vers les microservices, l'intégration de l'IA et le développement ERP d'entreprise pour des clients internationaux dans les secteurs de la santé, de la pharmacie et des opérations.",
      },
      {
        position: "Développeur Full-Stack",
        summary:  "Développement et maintenance d'applications web full-stack pour une entreprise SaaS américaine, livraison de fonctionnalités ayant amélioré l'engagement des utilisateurs de 50 %, avec des audits de sécurité et des optimisations de performance.",
      },
      {
        position: "Personnel IT / Administrateur Système",
        summary:  "Poste de service national gérant l'infrastructure IT d'une organisation gouvernementale à l'échelle nationale pendant les opérations électorales, les exercices d'inscription des électeurs et le support IT quotidien.",
      },
      {
        position: "Développeur Full-Stack",
        summary:  "Livraison de plus de 8 produits SaaS pour des clients ghanéens, dont un système de gestion des stocks par codes-barres et plusieurs applications web, avec 99,9 % de disponibilité via des déploiements AWS conteneurisés.",
      },
      {
        position: "Stagiaire Développeur Junior",
        summary:  "Stage international développant des logiciels d'entreprise et acquérant de l'expérience avec les pratiques de développement Java/Python.",
      },
    ],
    projects: [
      { description: "Outil de recherche documentaire IA de niveau entreprise permettant aux chercheurs pharmaceutiques non techniques d'interroger des données ERP complexes en langage naturel. Construit avec une infrastructure IA locale via Ollama, LangChain et les modèles DeepSeek AI — maintenant les données sensibles sur site. Le système génère des fichiers .XPT conformes SENDIG pour la soumission FDA automatiquement." },
      { description: "Direction d'une refonte architecturale complète remplaçant un monolithe Odoo étroitement couplé par des microservices FastAPI déployables indépendamment. Comprend la conception d'une API Gateway avec auth JWT, le cache Redis, la découverte de services et un framework Python de migration réutilisable pour extraire et transformer les données Odoo legacy." },
      { description: "Projet freelance de bout en bout livrant une présence web immobilière professionnelle et un backend de gestion pour une société immobilière ghanéenne. Le site marketing présente les annonces avec recherche et filtrage, tandis que le backend Odoo gère les prospects, contrats, propriétés et communications. Hébergé sur un VPS Hostinger avec NGINX et SSL." },
      { description: "Plateforme web où les candidats téléversent leur CV et une description de poste cible ; le système utilise une analyse propulsée par LLM pour retourner des améliorations spécifiques et actionnables adaptées au rôle. Déployé sur cv.edtmsys.com." },
      { description: "Produit SaaS conçu pour le marché ghanéen des crèches, répondant aux besoins uniques du secteur local de la petite enfance. Fonctionnalités : architecture offline-first (essentielle pour une connectivité instable), intégration Mobile Money MoMo, communication parents-enseignants, suivi des présences et rapports de progrès." },
      { description: "Système de gestion des stocks en entrepôt piloté par codes-barres pour le suivi en temps réel des stocks dans plusieurs entrepôts. Construit avec un backend Python/Django, un frontend React et une base de données PostgreSQL. Intégré aux flux ERP existants." },
      { description: "Plateforme complète de gestion de coopérative de crédit pour le programme d'épargne coopérative de l'Église du Pentecôte. Gère les inscriptions des membres, plusieurs types de comptes (épargne, susu, dépôt fixe), le traitement des transactions, les notifications SMS et les rapports financiers." },
      { description: "Développement frontend complet pour une marque de ferme bio américaine. Comprend un composant de localisateur de magasins dynamique, des bannières d'annonces pilotées par CMS avec effets de défilement, le rendu d'images PortableText et des améliorations de la navigation. Contenu entièrement géré via Sanity CMS." },
      { description: "Conception produit et identité de marque complètes pour FlexiFund — un concept fintech ciblant les consommateurs africains sous-bancarisés. Comprend la suite logo, les directives de marque, les systèmes de couleurs et un kit UI mobile complet couvrant l'onboarding, le tableau de bord, les objectifs d'épargne et les flux de demande de prêt." },
    ],
    education: [
      { degree: 'Licence en Informatique',                                                        field: 'Informatique' },
      { degree: 'Diplôme Professionnel, Réseaux Informatiques (Microsoft / Cisco CCNA)',           field: 'Réseaux Informatiques' },
    ],
  },

  // ── SPANISH ───────────────────────────────────────────────────────────────
  es: {
    personalInfo: {
      title:   "Ingeniero Full-Stack Senior & Líder Técnico de Equipo",
      summary: "Ingeniero Full-Stack Senior con más de 6 años de experiencia diseñando y desplegando aplicaciones en producción en África, EE. UU., EAU y Australia. Especializado en los ecosistemas de Python y React/Next.js, lidero equipos de ingenieros en migraciones arquitectónicas complejas e integro IA para resolver problemas operativos reales.",
    },
    jobs: [
      {
        position: "Ingeniero de Software Principal / Líder Técnico de Equipo",
        summary:  "Liderazgo de un equipo de ingenieros intercontinental en una migración mayor a microservicios, integración de IA y desarrollo de ERP empresarial para clientes internacionales en los sectores de salud, farmacéutico y operaciones.",
      },
      {
        position: "Desarrollador Full-Stack",
        summary:  "Desarrollo y mantenimiento de aplicaciones web full-stack para una empresa SaaS de EE. UU., entregando funciones que mejoraron la participación de usuarios en un 50 % y realizando auditorías de seguridad y optimizaciones de rendimiento.",
      },
      {
        position: "Personal de TI / Administrador de Sistemas",
        summary:  "Destino de servicio nacional gestionando la infraestructura de TI de una organización gubernamental a escala nacional durante operaciones electorales, ejercicios de registro de votantes y soporte de TI diario.",
      },
      {
        position: "Desarrollador Full-Stack",
        summary:  "Entrega de más de 8 productos SaaS para clientes ghaneses, incluyendo un sistema de gestión de inventario por código de barras y múltiples aplicaciones web, con un 99,9 % de disponibilidad mediante despliegues AWS en contenedores.",
      },
      {
        position: "Pasante Desarrollador Junior",
        summary:  "Práctica internacional desarrollando software empresarial y adquiriendo experiencia en las prácticas de desarrollo Java/Python.",
      },
    ],
    projects: [
      { description: "Herramienta de búsqueda de documentos empresarial con IA que permite a investigadores farmacéuticos no técnicos consultar datos ERP complejos en lenguaje natural. Construida con infraestructura de IA local usando Ollama, LangChain y modelos DeepSeek AI, manteniendo los datos sensibles en las instalaciones. Genera archivos .XPT conformes a SENDIG para la presentación a la FDA." },
      { description: "Lideré una renovación arquitectónica completa reemplazando un monolito Odoo fuertemente acoplado con microservicios FastAPI desplegables de forma independiente. Incluye diseño de un API Gateway personalizado con JWT, caché Redis, descubrimiento de servicios y un framework de migración Python reutilizable para extraer y transformar datos Odoo legados." },
      { description: "Proyecto freelance de extremo a extremo que entrega una presencia web inmobiliaria profesional y un backend de gestión para una empresa inmobiliaria ghanese. El sitio de marketing muestra listados de propiedades con búsqueda y filtrado, mientras el backend Odoo gestiona leads, contratos, propiedades y comunicaciones. Alojado en un VPS de Hostinger con NGINX y SSL." },
      { description: "Plataforma web donde los solicitantes de empleo suben su CV y una descripción del puesto objetivo; el sistema usa análisis impulsado por LLM para devolver mejoras específicas y accionables adaptadas al rol. Desplegado en cv.edtmsys.com." },
      { description: "Producto SaaS específico del mercado para guarderías ghanese, que aborda las necesidades únicas del sector local de cuidado infantil. Características: arquitectura offline-first (esencial para conectividad inestable), integración de Mobile Money MoMo, comunicación padres-docentes, seguimiento de asistencia e informes de progreso." },
      { description: "Sistema integral de gestión de inventario en almacén mediante escaneo de códigos de barras para seguimiento de stock en tiempo real en múltiples ubicaciones. Construido con backend Python/Django, frontend React y base de datos PostgreSQL. Integrado con los flujos ERP existentes." },
      { description: "Plataforma completa de gestión de cooperativa de crédito para el programa de ahorros cooperativos de la Iglesia del Pentecostés. Gestiona inscripciones de miembros, múltiples tipos de cuentas (ahorro, susu, depósito fijo), procesamiento de transacciones, notificaciones SMS e informes financieros." },
      { description: "Desarrollo frontend completo para una marca de granja orgánica con sede en EE. UU. Incluye un componente de localizador de tiendas dinámico, banners de anuncios impulsados por CMS con efectos de desplazamiento, renderizado de imágenes PortableText y mejoras de UX en la navegación. Contenido gestionado íntegramente mediante Sanity CMS." },
      { description: "Diseño de producto e identidad de marca de extremo a extremo para FlexiFund — un concepto fintech dirigido a consumidores africanos no bancarizados. Incluye suite de logotipo, guías de marca, sistemas de color y un kit de UI completo para aplicación móvil con onboarding, panel, objetivos de ahorro y flujos de solicitud de préstamo." },
    ],
    education: [
      { degree: 'Licenciatura en Informática',                                               field: 'Informática' },
      { degree: 'Diploma Profesional, Redes Informáticas (Microsoft / Cisco CCNA)',           field: 'Redes Informáticas' },
    ],
  },

  // ── GERMAN ────────────────────────────────────────────────────────────────
  de: {
    personalInfo: {
      title:   "Senior Full-Stack-Entwickler & Technischer Teamleiter",
      summary: "Senior Full-Stack-Entwickler mit über 6 Jahren Erfahrung in der Konzeption und Bereitstellung produktionsreifer Anwendungen in Afrika, den USA, den VAE und Australien. Spezialisiert auf die Python- und React/Next.js-Ökosysteme, leite ich Ingenieurteams durch komplexe Architekturmigrationen und integriere KI zur Lösung realer Betriebsprobleme.",
    },
    jobs: [
      {
        position: "Leitender Software-Entwickler / Technischer Teamleiter",
        summary:  "Leitung eines interkontinentalen Ingenieurteams bei einer umfangreichen Microservices-Migration, KI-Integration und Enterprise-ERP-Entwicklung für internationale Kunden in den Bereichen Gesundheitswesen, Pharmazie und Betrieb.",
      },
      {
        position: "Full-Stack-Entwickler",
        summary:  "Entwicklung und Pflege von Full-Stack-Webanwendungen für ein US-amerikanisches SaaS-Unternehmen; Bereitstellung von Funktionen, die das Nutzerengagement um 50 % steigerten, sowie Sicherheitsaudits und Leistungsoptimierungen.",
      },
      {
        position: "IT-Personal / Systemadministrator",
        summary:  "Nationaler Diensteinsatz zur Verwaltung der IT-Infrastruktur einer nationalstaatlichen Regierungsorganisation während Wahloperationen, Wählerregistrierungsübungen und täglichem IT-Support.",
      },
      {
        position: "Full-Stack-Entwickler",
        summary:  "Lieferung von mehr als 8 SaaS-Produkten für ghanaische Kunden, darunter ein Barcode-Lagerverwaltungssystem und mehrere Webanwendungen, mit 99,9 % Verfügbarkeit durch containerisierte AWS-Deployments.",
      },
      {
        position: "Junior-Entwickler Praktikant",
        summary:  "Internationales Praktikum mit Entwicklung von Unternehmenssoftware und Erfahrungen mit Java/Python-Entwicklungspraktiken.",
      },
    ],
    projects: [
      { description: "KI-gestütztes Enterprise-Dokumentensuchsystem, das nicht-technischen pharmazeutischen Forschern ermöglicht, komplexe ERP-Daten in natürlicher Sprache abzufragen. Aufgebaut auf lokaler KI-Infrastruktur mit Ollama, LangChain und DeepSeek-KI-Modellen — sensible Daten bleiben On-Premises. Das System generiert SENDIG-konforme .XPT-Dateien für die FDA-Einreichung automatisch." },
      { description: "Leitete eine vollständige Architekturüberholung, bei der ein eng gekoppeltes Odoo-Monolith durch unabhängig deploybare FastAPI-Microservices ersetzt wurde. Umfasst Design eines benutzerdefinierten API-Gateways mit JWT-Auth, Redis-Caching, Service Discovery und ein wiederverwendbares Python-Migrations-Framework zur Extraktion und Transformation von Legacy-Odoo-Daten." },
      { description: "End-to-End-Freelance-Projekt zur Bereitstellung einer professionellen Immobilien-Webpräsenz und eines Verwaltungs-Backends für ein ghanaisches Immobilienunternehmen. Die Marketing-Website präsentiert Angebote mit Suche und Filterung, während das Odoo-Backend Leads, Verträge, Objekte und Kommunikation verwaltet. Gehostet auf einem Hostinger-VPS mit NGINX und SSL." },
      { description: "Webplattform, auf der Bewerber ihren Lebenslauf und eine Ziel-Stellenbeschreibung hochladen; das System nutzt LLM-gestützte Analyse, um spezifische, umsetzbare Verbesserungen passend zur Stelle zurückzugeben. Unter cv.edtmsys.com deployed und live." },
      { description: "Marktspezifisches SaaS-Produkt für ghanaische Kindertagesstätten, das die besonderen Bedürfnisse des lokalen Kinderbetreuungssektors adressiert. Funktionen: Offline-First-Architektur (unverzichtbar bei instabiler Verbindung), MTN MoMo Mobile Money-Integration, Eltern-Lehrer-Kommunikation, Anwesenheitsverfolgung und Fortschrittsberichte." },
      { description: "Umfassendes Barcode-gesteuertes Lagerbestandsverwaltungssystem für die Echtzeit-Bestandsverfolgung an mehreren Standorten. Gebaut mit Python/Django-Backend, React-Frontend und PostgreSQL-Datenbank. In bestehende ERP-Workflows integriert." },
      { description: "Vollständige Kreditgenossenschaftsverwaltungsplattform für das kooperative Sparprogramm der Pfingstkirche. Verwaltet Mitgliederregistrierungen, mehrere Kontotypen (Spar-, Susu-, Festgeldkonto), Transaktionsverarbeitung, SMS-Benachrichtigungen und Finanzberichte." },
      { description: "Vollständiger Frontend-Aufbau für eine US-amerikanische Bio-Farmmarke. Umfasst eine dynamische Ladenfinderkomponente, CMS-gesteuerte Ankündigungsbanner mit Scroll-Effekten, PortableText-Bild-Rendering und Verbesserungen der Navigations-UX. Inhalte vollständig über Sanity CMS verwaltet." },
      { description: "End-to-End-Produktdesign und Markenidentität für FlexiFund — ein Fintech-Konzept für unterversorgte afrikanische Verbraucher. Umfasst Logo-Suite, Markenrichtlinien, Farbsysteme und ein vollständiges Mobile-App-UI-Kit mit Onboarding, Dashboard, Sparzielen und Kreditantragsprozessen." },
    ],
    education: [
      { degree: 'B.Sc. Informatik',                                                      field: 'Informatik' },
      { degree: 'Berufsabschluss, Computernetzwerke (Microsoft / Cisco CCNA)',             field: 'Computernetzwerke' },
    ],
  },
}

// ---------------------------------------------------------------------------
// Seeders
// ---------------------------------------------------------------------------

async function seedPersonalInfo(locale, t) {
  const id = `personalInfo-${locale}`
  const existingIds = new Set(
    (await client.fetch(`*[_type == "personalInfo" && _id == $id]{_id}`, { id })).map(d => d._id)
  )
  const doc = {
    _id: id, _type: 'personalInfo', language: locale,
    name: src.profile.name, title: t.title, email: src.profile.email,
    phone: src.profile.phone, location: src.profile.location,
    website: src.profile.website, github: src.profile.github,
    linkedin: src.profile.linkedin, summary: t.summary,
    ...(t.bioLong ? { bioLong: t.bioLong } : {}),
  }
  await commitBatch([doc], existingIds, () => `personalInfo-${locale}`)
}

async function seedWorkExperience(locale, t) {
  const existingIds = new Set(
    (await client.fetch(`*[_type == "workExperience" && language == $locale]{_id}`, { locale })).map(d => d._id)
  )
  const docs = src.work_experience.map((job, i) => {
    const localisedJob = t.jobs[i] ?? { position: job.title, summary: job.summary }
    return {
      _id: `workExp-${slugify(job.company)}-${locale}`,
      _type: 'workExperience', language: locale,
      company: job.company, position: localisedJob.position,
      startDate: `${job.start_date}-01`,
      endDate: job.end_date ? `${job.end_date}-01` : undefined,
      description: buildDescription(job, locale, localisedJob),
      technologies: job.technologies || [], order: i + 1,
    }
  })
  await commitBatch(docs, existingIds, d => `${d.company} — ${d.position}`)
}

async function seedSkills(locale) {
  const existingIds = new Set(
    (await client.fetch(`*[_type == "skill" && language == $locale]{_id}`, { locale })).map(d => d._id)
  )
  let order = 1
  const docs = []
  for (const group of src.skills) {
    const categoryValue = CATEGORY_MAP[group.category]
    if (!categoryValue) { console.warn(`  ⚠ Unknown category "${group.category}" — skipping`); continue }
    for (const skill of group.skills) {
      docs.push({ _id: `skill-${slugify(skill.name)}-${locale}`, _type: 'skill', language: locale, name: skill.name, level: skill.level, category: categoryValue, order: order++ })
    }
  }
  await commitBatch(docs, existingIds, d => `[${d.category}] ${d.name} (${d.level}%)`)
}

async function seedProjects(locale, t) {
  const existingIds = new Set(
    (await client.fetch(`*[_type == "project" && language == $locale]{_id}`, { locale })).map(d => d._id)
  )
  const docs = src.projects.map((proj, i) => {
    const localised = t.projects[i] ?? { description: proj.description }
    return {
      _id: `project-${proj.slug}-${locale}`, _type: 'project', language: locale,
      name: proj.title, description: localised.description,
      technologies: proj.technologies || [],
      github: proj.github || undefined, liveUrl: proj.live_url || undefined,
      featured: proj.featured,
      stats: { uptime: proj.status === 'Production' ? 99.9 : undefined },
      order: i + 1,
    }
  })
  await commitBatch(docs, existingIds, d => d.name)
}

async function seedEducation(locale, t) {
  const existingIds = new Set(
    (await client.fetch(`*[_type == "education" && language == $locale]{_id}`, { locale })).map(d => d._id)
  )
  const docs = src.education.map((edu, i) => {
    const localised = t.education[i] ?? { degree: edu.degree, field: 'Computer Science' }
    return {
      _id: `edu-${slugify(edu.institution)}-${locale}`, _type: 'education', language: locale,
      institution: edu.institution, degree: localised.degree, field: localised.field,
      startDate: `${edu.start_year}-09-01`, endDate: `${edu.end_year}-06-01`,
      gpa: edu.gpa, highlights: edu.highlights || [], order: i + 1,
    }
  })
  await commitBatch(docs, existingIds, d => `${d.degree} — ${d.institution}`)
}

async function seedCertifications(locale) {
  const existingIds = new Set(
    (await client.fetch(`*[_type == "certification" && language == $locale]{_id}`, { locale })).map(d => d._id)
  )
  const docs = src.certifications.map((cert, i) => ({
    _id: `cert-${slugify(cert.name)}-${locale}`, _type: 'certification', language: locale,
    name: cert.name, issuer: cert.issuer, year: String(cert.year), order: i + 1,
  }))
  await commitBatch(docs, existingIds, d => `${d.name} (${d.year})`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function seedLocale(locale) {
  const t = LOCALE_CONTENT[locale]
  if (!t) { console.error(`No translations defined for locale: ${locale}`); return }

  console.log(`\n${'═'.repeat(60)}`)
  console.log(` LOCALE: ${locale.toUpperCase()}`)
  console.log('═'.repeat(60))

  console.log('\n── Personal Info')
  await seedPersonalInfo(locale, t.personalInfo)

  console.log('\n── Work Experience')
  await seedWorkExperience(locale, t)

  console.log('\n── Skills')
  await seedSkills(locale)

  console.log('\n── Projects')
  await seedProjects(locale, t)

  console.log('\n── Education')
  await seedEducation(locale, t)

  console.log('\n── Certifications')
  await seedCertifications(locale)
}

async function main() {
  console.log('\nSanity Multi-Locale Seed')
  console.log(`Project : ${PROJECT_ID}  |  Dataset: ${DATASET}`)
  console.log(`Locales : ${LOCALES_TO_SEED.join(', ')}`)
  console.log(`Mode    : ${FORCE_REPLACE ? 'REPLACE — existing docs will be overwritten' : 'SAFE — existing docs are preserved'}`)

  for (const locale of LOCALES_TO_SEED) {
    await seedLocale(locale)
  }

  console.log(`\n${'═'.repeat(60)}`)
  console.log(' Done. Open Sanity Studio to review imported content.')
  console.log(' Tip: run with --replace to overwrite existing documents.')
  console.log('═'.repeat(60) + '\n')
}

main().catch(err => { console.error('\nFailed:', err.message); process.exit(1) })
