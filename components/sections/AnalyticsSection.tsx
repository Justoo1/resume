'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AnalyticsSectionProps {}

const ACHIEVEMENTS = [
  '85% improvement in data processing efficiency via AI-powered FDA compliance system',
  '40% faster deployments through enterprise microservices migration across 20+ Odoo apps',
  '99.9% uptime maintained across all international client systems in US, UAE and Australia',
]

const BAR_DATA = [
  { label: "Q1 '22", pct: 40 },
  { label: "Q4 '22", pct: 58 },
  { label: "Q2 '23", pct: 70 },
  { label: "Q1 '24", pct: 85 },
  { label: 'NOW',    pct: 100 },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AnalyticsSection: React.FC<AnalyticsSectionProps> = (_props) => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* Left — achievements */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
              Impact Delivered
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
              A data-driven approach to engineering — measurable outcomes from enterprise projects
              and international client engagements across three continents.
            </p>
            <ul className="space-y-4">
              {ACHIEVEMENTS.map((text, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-200">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — bar chart */}
          <motion.div
            className="flex-1 w-full max-w-lg"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Career Growth
                </h4>
                <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-black tracking-tight">
                  +42% YEARLY
                </span>
              </div>

              {/* Animated bars */}
              <div className="h-48 flex items-end gap-3 px-2">
                {BAR_DATA.map((bar, i) => (
                  <motion.div
                    key={bar.label}
                    className="flex-1 rounded-t-lg bg-brand"
                    style={{ opacity: 0.2 + (i / BAR_DATA.length) * 0.8 }}
                    initial={{ scaleY: 0, originY: 1 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                    custom={bar.pct}
                  >
                    {/* Height driven by inline style */}
                    <div style={{ height: `${bar.pct}%`, minHeight: '8px' }} />
                  </motion.div>
                ))}
              </div>

              {/* X labels */}
              <div
                className="mt-4 grid text-[10px] text-slate-500 font-bold px-2"
                style={{ gridTemplateColumns: `repeat(${BAR_DATA.length}, 1fr)` }}
              >
                {BAR_DATA.map((bar) => (
                  <span key={bar.label}>{bar.label}</span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default AnalyticsSection
