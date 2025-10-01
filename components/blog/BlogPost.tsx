'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowLeft, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PortableText } from '@portabletext/react'

interface BlogPostProps {
  post: {
    _id: string
    title: string
    slug: string
    excerpt: string
    coverImageUrl?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[]
    author?: string
    category?: string
    tags?: string[]
    publishedAt: string
    readingTime?: number
  }
}

const portableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => (
      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={value.asset.url}
          alt={value.alt || 'Blog image'}
          width={800}
          height={450}
          className="w-full h-auto"
        />
      </div>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: ({ value }: any) => (
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6">
        {value.filename && (
          <div className="text-slate-400 text-sm mb-2">{value.filename}</div>
        )}
        <code className={`language-${value.language}`}>{value.code}</code>
      </pre>
    )
  },
  block: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">
        {children}
      </h1>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 text-slate-900 dark:text-slate-100">
        {children}
      </h2>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-8 mb-3 text-slate-900 dark:text-slate-100">
        {children}
      </h3>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normal: ({ children }: any) => (
      <p className="text-lg leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
        {children}
      </p>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 rounded-r">
        {children}
      </blockquote>
    )
  },
  list: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300">
        {children}
      </ol>
    )
  },
  marks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {children}
      </a>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: ({ children }: any) => (
      <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
        {children}
      </code>
    )
  }
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link href="/blog">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>
      </motion.div>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-2xl"
        >
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          {post.category && (
            <Badge className="absolute top-6 left-6 bg-blue-600 text-white text-base px-4 py-2">
              {post.category}
            </Badge>
          )}
        </motion.div>
      )}

      {/* Title and Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-slate-100">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mb-8 text-slate-600 dark:text-slate-400">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readingTime} min read
            </div>
          )}
        </div>

        {/* Excerpt */}
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="prose prose-lg dark:prose-invert prose-blue max-w-none"
      >
        <PortableText value={post.content} components={portableTextComponents} />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700"
      >
        <Link href="/blog">
          <Button variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Button>
        </Link>
      </motion.div>
    </article>
  )
}
