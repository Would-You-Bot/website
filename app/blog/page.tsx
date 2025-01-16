import { BlogList, BlogListSkeleton } from '@/app/blog/_components'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  title: 'Blog - Would You Bot',
  description:
    'The official blog of Would You Bot. Stay up to date with the latest Discord related news, updates, and announcements.',
  twitter: {
    title: 'Blog - Would You Bot',
    description:
      'The official blog of Would You Bot. Stay up to date with the latest Discord related news, updates, and announcements.'
  },
  openGraph: {
    title: 'Blog - Would You Bot',
    description:
      'The official blog of Would You Bot. Stay up to date with the latest Discord related news, updates, and announcements.'
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  themeColor: '#0598F6',
  maximumScale: 5
}

const BlogPosts = async () => {
  return (
    <main className="w-full mx-auto max-w-8xl px-8">
      <h1 className="text-4xl font-bold text-foreground">
        <span className="text-brand-red-100 drop-shadow-red-glow">Would</span>{' '}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">You</span>{' '}
        Blog
      </h1>
      <div className="mt-8 flex flex-col gap-4">
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
    </main>
  )
}

export default BlogPosts
