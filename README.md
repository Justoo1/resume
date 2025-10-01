# Professional CV Portfolio

A modern, dynamic CV/Portfolio website built with Next.js 15, TypeScript, Sanity CMS, and Tailwind CSS. This project creates a beautiful, printable resume with analytics visualizations, project showcases, and comprehensive professional documentation.

![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Sanity](https://img.shields.io/badge/Sanity-CMS-red?style=flat-square&logo=sanity)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎨 Modern Design
- **Hero Section** with profile image, social links, and professional summary
- **Gradient backgrounds** with animated patterns
- **Responsive design** that looks great on all devices
- **Print-optimized** CSS for professional PDF exports

### 📊 Dynamic Content Management
- **Sanity CMS Integration** for easy content updates
- **Real-time content updates** without redeployment
- **Image optimization** with Sanity CDN
- **Structured content schemas** for all CV sections

### 📈 Data Visualization
- **Project analytics** with Recharts
- **Skills proficiency** charts (bar, pie, line graphs)
- **Interactive metrics** showing project impact
- **Growth timeline** visualization

### 🚀 Key Sections
1. **Hero Section** - Profile, contact info, and professional summary
2. **Work Experience** - Timeline of professional positions
3. **Projects** - Showcase with stats, technologies, and live demos
4. **Case Studies** - Detailed project breakdowns with metrics
5. **Process Documentation** - Methodologies and workflows
6. **Skills & Education** - Technical skills with proficiency levels
7. **Certifications** - Professional credentials
8. **Analytics Dashboard** - Visual insights into your career

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.1.8** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components

### CMS
- **Sanity CMS 3.89** - Headless content management
- **GROQ** - Query language for content fetching
- **Sanity Studio** - Content editing interface

### Visualization
- **Recharts** - Charting library for analytics
- **Lucide React** - Icon library

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler (dev mode)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Sanity account (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/resume.git
cd resume
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Sanity CMS

Create a Sanity project at [sanity.io](https://www.sanity.io/):

```bash
npm install -g @sanity/cli
sanity login
sanity init
```

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

You can find your project ID in the Sanity dashboard or in `sanity.config.ts`.

### 5. Deploy Sanity Schemas

```bash
npx sanity deploy
```

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 7. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to add and edit your content.

## 📁 Project Structure

```
resume/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── studio/              # Sanity Studio route
├── components/
│   ├── ModernCVPortfolio.tsx    # Main portfolio component
│   ├── sections/                 # Section components
│   │   ├── HeroSection.tsx
│   │   ├── WorkExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CaseStudiesSection.tsx
│   │   ├── SkillsEducationSection.tsx
│   │   ├── AnalyticsSection.tsx
│   │   └── ProcessDocumentationSection.tsx
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── sanity.ts            # Sanity client & queries
│   └── utils.ts             # Utility functions
├── sanity/
│   ├── schemaTypes/         # Content schemas
│   │   ├── personalInfo.ts
│   │   ├── workExperience.ts
│   │   ├── project.ts
│   │   ├── skill.ts
│   │   ├── education.ts
│   │   ├── certification.ts
│   │   └── caseStudy.ts
│   ├── env.ts               # Environment config
│   └── lib/                 # Sanity utilities
├── public/                  # Static assets
├── sanity.config.ts         # Sanity configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies
```

## 📝 Content Management

### Sanity Studio

Access the Sanity Studio at `/studio` to manage your content:

1. **Personal Info** - Name, title, contact information, summary
2. **Work Experience** - Job positions with descriptions and technologies
3. **Projects** - Portfolio projects with images, stats, and links
4. **Skills** - Technical skills with proficiency levels and categories
5. **Education** - Academic qualifications
6. **Certifications** - Professional certifications
7. **Case Studies** - Detailed project case studies with metrics

### Content Schemas

Each content type has a dedicated schema with validation:

- **Required fields** ensure complete information
- **Order fields** control display sequence
- **Image handling** with hotspot support
- **Rich text** for detailed descriptions
- **Arrays** for technologies, highlights, etc.

## 🎨 Customization

### Styling

The project uses Tailwind CSS with custom configurations:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      // Customize your color scheme
    }
  }
}
```

### Components

All components are modular and can be customized:

```typescript
// Example: Modify section colors
<section className="bg-gradient-to-br from-blue-50 to-indigo-100">
  {/* Your content */}
</section>
```

### Fonts

The project uses Inter font family. Modify in `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

## 📊 Analytics Features

### Project Analytics
- User engagement metrics
- Uptime percentages
- Revenue/impact statistics
- Interactive bar charts

### Skills Visualization
- Proficiency levels by category
- Pie charts for skill distribution
- Category-based color coding

### Growth Timeline
- Project count over time
- Skill development tracking
- Line charts for trends

## 🖨️ Printing/PDF Export

The portfolio includes print-optimized styles:

1. Click the **Download/Print** button in the hero section
2. Use browser print (Cmd/Ctrl + P)
3. Select "Save as PDF" as the printer
4. Recommended: Use A4 paper size, margins: minimal

Print styles automatically:
- Remove interactive elements
- Optimize colors for print
- Adjust layouts for paper format
- Include all essential information

### 1. 🌓 Dark Mode Support

**Implementation:**
- Integrated `next-themes` for seamless theme switching
- Added theme toggle button in the hero section
- Configured dark mode CSS variables in `globals.css`
- Added `suppressHydrationWarning` to prevent hydration mismatches

**Files Added/Modified:**
- `components/providers/ThemeProvider.tsx` - Theme context provider
- `components/ui/theme-toggle.tsx` - Theme toggle button component
- `app/layout.tsx` - Wrapped app with ThemeProvider
- `app/globals.css` - Dark mode CSS variables

**Usage:**
- Click the sun/moon icon in the top-right corner to toggle between light and dark modes
- Respects system preferences by default
- Smooth transitions between themes

---

### 2. 🎯 SEO Optimization

**Implementation:**
- Created comprehensive metadata generation utility
- Added OpenGraph and Twitter Card support
- Implemented dynamic sitemap generation
- Added robots.txt configuration
- Created web app manifest for PWA

**Files Added:**
- `lib/metadata.ts` - SEO metadata generation helper
- `app/robots.ts` - Robots.txt configuration
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/manifest.ts` - Web app manifest

**Features:**
- Customizable page titles and descriptions
- Social media preview cards
- Search engine optimization
- Structured data support

---

### 3. 📊 Analytics Integration

**Implementation:**
- Integrated Google Analytics via `@next/third-parties`
- Added Plausible Analytics support
- Created unified Analytics component
- Privacy-focused analytics setup

**Files Added:**
- `components/Analytics.tsx` - Analytics component
- Updated `.env.local` - Analytics configuration

**Configuration:**
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourportfolio.com"
```

---

### 4. ✨ Framer Motion Animations

**Implementation:**
- Installed and configured Framer Motion
- Enhanced HeroSection with entry animations
- Created reusable animation components
- Added scroll-triggered animations

**Files Added:**
- `components/AnimatedSection.tsx` - Reusable animation wrappers
- Updated `components/sections/HeroSection.tsx` - Animated hero section

**Animation Components:**
- `AnimatedSection` - Fade in from bottom
- `FadeIn` - Simple fade in
- `SlideInLeft/Right` - Slide animations
- `ScaleIn` - Scale up animation
- `StaggerContainer/Item` - Staggered children animations

---

### 5. 📧 Contact Form with Email Service

**Implementation:**
- Integrated Resend email service
- Built contact form with react-hook-form
- Added Zod validation
- Implemented API route for form submissions

**Files Added:**
- `app/api/contact/route.ts` - API endpoint
- `components/ContactForm.tsx` - Contact form component
- Updated `.env.local` - Email service configuration

**Configuration:**
```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="your-name@yourdomain.com"
EMAIL_TO="your-email@example.com"
```

**Features:**
- Form validation with helpful error messages
- Success/error status feedback
- Email formatting with HTML templates
- Spam protection

---

### 6. 📝 Blog Section with Sanity CMS

**Implementation:**
- Created blog post schema in Sanity
- Built blog listing and individual post pages
- Integrated Portable Text for rich content
- Added blog navigation

**Files Added:**
- `sanity/schemaTypes/blogPost.ts` - Blog post schema
- `app/blog/page.tsx` - Blog listing page
- `app/blog/[slug]/page.tsx` - Individual blog post page
- `components/blog/BlogList.tsx` - Blog listing component
- `components/blog/BlogPost.tsx` - Blog post component
- Updated `lib/sanity.ts` - Blog queries

**Features:**
- Rich text content with code blocks
- Cover images with Next.js Image optimization
- Categories and tags
- Reading time estimation
- SEO-optimized with dynamic metadata
- Responsive grid layout

**Content Management:**
Access Sanity Studio at `/studio` to create and manage blog posts.

---

### 7. 📱 PWA Support

**Implementation:**
- Integrated `@ducanh2912/next-pwa`
- Configured service worker
- Added web app manifest
- Created app icons

**Files Added/Modified:**
- `next.config.ts` - PWA configuration
- `app/manifest.ts` - Web app manifest
- `public/icon-192.png` - App icon (placeholder)
- `public/icon-512.png` - App icon (placeholder)

**Features:**
- Offline support
- Add to home screen
- Fast loading with service worker caching
- Installable web app

**Note:** Replace placeholder icons in `/public` with actual icons (192x192 and 512x512 PNG).

---

### 8. 🌍 Multi-language Support (i18n)

**Implementation:**
- Integrated next-intl for internationalization
- Added language switcher component
- Created translation files for multiple languages
- Configured middleware for locale routing

**Files Added:**
- `i18n/request.ts` - i18n configuration
- `middleware.ts` - Locale routing middleware
- `messages/en.json` - English translations
- `messages/es.json` - Spanish translations
- `components/LanguageSwitcher.tsx` - Language selector

**Supported Languages:**
- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)
- 🇫🇷 French (fr) - Add translations in `messages/fr.json`
- 🇩🇪 German (de) - Add translations in `messages/de.json`

**Usage:**
Click the language icon in the top-right corner to switch languages.


## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/resume)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. Deploy!

### Other Platforms

The project can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted

## 🔧 Development Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Sanity](https://www.sanity.io/) - Content Management System
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Recharts](https://recharts.org/) - Charting Library
- [Lucide](https://lucide.dev/) - Icon Library

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact via email (your-email@example.com)
- Check the [documentation](https://docs.example.com)



---

**Built with ❤️ using Next.js, TypeScript, and Sanity CMS**