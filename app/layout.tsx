import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata'
import { Analytics } from '@/components/Analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateSEOMetadata({
  name: 'Your Name',
  title: 'Software Engineer & Web Developer',
  description: 'Professional CV and Portfolio showcasing skills, experience, and projects in full-stack development, cloud computing, and modern web technologies',
  url: 'https://yourportfolio.com',
  keywords: ['portfolio', 'cv', 'resume', 'software engineer', 'web developer', 'full-stack', 'react', 'next.js', 'typescript']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
