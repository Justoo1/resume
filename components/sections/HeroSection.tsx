'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  User,
  Download
} from 'lucide-react'

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
  profileImageUrl?: string
}

interface HeroSectionProps {
  personalInfo: PersonalInfo | null
  onPrint: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ personalInfo, onPrint }) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Floating Buttons */}
      <div className="absolute top-6 right-6 z-20 print:hidden flex gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          onClick={onPrint}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image Section */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 p-1">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={personalInfo?.profileImageUrl}
                  alt={personalInfo?.name}
                  className="rounded-full object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-slate-700 text-5xl font-bold">
                  {personalInfo?.name?.split(' ').map(n => n[0]).join('') || <User className="w-20 h-20" />}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* Decorative rings */}
            <motion.div
              className="absolute -inset-4 border-2 border-white/20 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute -inset-8 border border-white/10 rounded-full"></div>
          </motion.div>

          {/* Name and Info */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {personalInfo?.name || 'Your Name'}
            </motion.h1>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-blue-400 to-indigo-400"></div>
              <p className="text-2xl lg:text-3xl text-blue-200 font-medium tracking-wide">
                {personalInfo?.title || 'Your Professional Title'}
              </p>
              <div className="w-16 h-px bg-gradient-to-r from-indigo-400 to-blue-400"></div>
            </div>

            {/* Summary */}
            {personalInfo?.summary && (
              <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-3xl">
                {personalInfo.summary}
              </p>
            )}

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100 mb-8">
              {personalInfo?.email && (
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="hover:text-white transition-colors">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="hover:text-white transition-colors">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="hover:text-white transition-colors">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Globe className="w-5 h-5 text-blue-300" />
                  </div>
                  <a href={personalInfo.website} className="hover:text-white transition-colors">
                    {personalInfo.website.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {personalInfo?.github && (
                <motion.a
                  href={personalInfo.github}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              )}
              {personalInfo?.linkedin && (
                <motion.a
                  href={personalInfo.linkedin}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
