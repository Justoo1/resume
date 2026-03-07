'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, Cpu, Heart, Lightbulb, ChevronDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  summary: string
  bioLong?: string
  profileImageUrl?: string
}

interface HeroSectionProps {
  personalInfo: PersonalInfo | null
  onPrint?: () => void
}

// Split the long bio into 4 thematic paragraphs
function parseBio(bio: string): string[] {
  const markers = ['My work spans', 'I care deeply', 'Outside of work']
  const parts: string[] = []
  let remaining = bio
  for (const marker of markers) {
    const idx = remaining.indexOf(marker)
    if (idx === -1) continue
    parts.push(remaining.slice(0, idx).trim())
    remaining = remaining.slice(idx)
  }
  parts.push(remaining.trim())
  return parts.filter(Boolean)
}

const BIO_CARDS = [
  { icon: User,      label: 'Who I am'       },
  { icon: Cpu,       label: 'What I build'    },
  { icon: Heart,     label: 'How I work'      },
  { icon: Lightbulb, label: 'Beyond the code' },
]

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo }) => {
  const [storyOpen, setStoryOpen] = useState(false)

  const bioParagraphs = personalInfo?.bioLong
    ? parseBio(personalInfo.bioLong)
    : []

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-white dark:bg-slate-900">
      {/* Background blob */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-brand/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left ── */}
        <motion.div
          className="order-2 lg:order-1"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            Available for New Projects
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] mb-6 text-slate-900 dark:text-white">
            Senior Full-Stack{' '}
            <span className="text-brand">Engineer.</span>
          </h1>

          {/* Short summary */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-xl">
            {personalInfo?.summary ??
              'Building scalable, high-performance systems with a focus on modern architecture, clean code, and exceptional results.'}
          </p>

          {/* Location chip */}
          {personalInfo?.location && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-8">
              <MapPin className="w-4 h-4 text-brand" />
              {personalInfo.location}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {personalInfo?.github && (
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-12 px-6 bg-brand text-white rounded-lg font-bold hover:bg-brand/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GithubIcon className="w-5 h-5" />
                View GitHub
              </motion.a>
            )}
            {personalInfo?.linkedin && (
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkedinIcon className="w-5 h-5" />
                LinkedIn Profile
              </motion.a>
            )}
          </div>

          {/* "Read my story" toggle */}
          {bioParagraphs.length > 0 && (
            <button
              onClick={() => setStoryOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-bold text-brand hover:text-brand/80 transition-colors"
            >
              <span>{storyOpen ? 'Close story' : 'Read my full story'}</span>
              <motion.div
                animate={{ rotate: storyOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          )}
        </motion.div>

        {/* ── Right: profile image ── */}
        <motion.div
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative w-full max-w-md aspect-square">
            {/* Rotated accent */}
            <div className="absolute -inset-4 bg-brand/20 rounded-3xl rotate-3 pointer-events-none" />

            {/* Image frame */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700">
              {personalInfo?.profileImageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={personalInfo.profileImageUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand/10">
                  <User className="w-32 h-32 text-brand/30" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Expandable Full Bio ── */}
      <AnimatePresence>
        {storyOpen && bioParagraphs.length > 0 && (
          <motion.div
            key="story"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bioParagraphs.slice(0, 4).map((text, i) => {
                  const card = BIO_CARDS[i] ?? BIO_CARDS[0]
                  const Icon = card.icon
                  return (
                    <motion.div
                      key={i}
                      className="flex gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                    >
                      <div className="shrink-0 w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center mt-0.5">
                        <Icon className="w-4 h-4 text-brand" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-2">
                          {card.label}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {text}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSection
