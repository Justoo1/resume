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

## 🔮 Future Enhancements

- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Blog section integration
- [ ] Contact form with email service
- [ ] SEO optimization with metadata
- [ ] Animation improvements with Framer Motion
- [ ] PWA support
- [ ] Analytics integration (Google Analytics, Plausible)

---

**Built with ❤️ using Next.js, TypeScript, and Sanity CMS**