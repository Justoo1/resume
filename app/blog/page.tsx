import { getBlogPosts } from '@/lib/sanity'
import { BlogList } from '@/components/blog/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest articles on software development, design, and technology'
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogList posts={posts} />
    </main>
  )
}
