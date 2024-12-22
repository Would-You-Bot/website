import { BlogList, BlogListSkeleton } from '@/app/blog/_components'
import { Suspense } from 'react'

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
