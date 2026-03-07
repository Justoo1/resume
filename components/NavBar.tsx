'use client'

import { Terminal } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface PersonalInfo {
  name: string
  email: string
  profileImageUrl?: string
}

interface NavBarProps {
  personalInfo: PersonalInfo | null
}

export default function NavBar({ personalInfo }: NavBarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-brand p-2 rounded-lg text-white">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            {personalInfo?.name || 'Portfolio'}
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'Experience', href: '#experience' },
            { label: 'Projects',   href: '#projects' },
            { label: 'Skills',     href: '#skills' },
            { label: 'Education',  href: '#education' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand dark:hover:text-brand transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          {personalInfo?.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="hidden sm:flex items-center justify-center h-10 px-5 bg-brand hover:bg-brand/90 text-white rounded-lg text-sm font-bold transition-all"
            >
              Contact Me
            </a>
          )}
          <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center overflow-hidden border-2 border-brand/30 flex-shrink-0">
            {personalInfo?.profileImageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={personalInfo.profileImageUrl}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-brand font-bold text-sm">
                {personalInfo?.name?.[0] ?? 'J'}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
