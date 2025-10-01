import type { Metadata } from 'next'

interface SEOConfig {
  name?: string
  title?: string
  description?: string
  url?: string
  image?: string
  keywords?: string[]
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    name = 'Your Name',
    title = 'Software Engineer',
    description = 'Professional CV and Portfolio showcasing skills, experience, and projects',
    url = 'https://yourportfolio.com',
    image = '/og-image.png',
    keywords = ['portfolio', 'cv', 'resume', 'software engineer', 'web developer']
  } = config

  const fullTitle = `${name} - ${title}`
  const fullDescription = description

  return {
    title: {
      default: fullTitle,
      template: `%s | ${name}`
    },
    description: fullDescription,
    keywords,
    authors: [{ name }],
    creator: name,
    publisher: name,
    metadataBase: new URL(url),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: fullTitle,
      description: fullDescription,
      siteName: fullTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: '@yourusername'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code'
    }
  }
}
