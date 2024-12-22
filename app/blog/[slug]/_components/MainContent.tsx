'use server'

import { CompileMDXResult } from 'next-mdx-remote/rsc'
import { FrontMatter } from '@/app/blog/[slug]/_data'
import blogStyles from '@/styles/blog.module.css'

interface MainContentProps {
	source: CompileMDXResult<FrontMatter>
}

export async function MainContent({ source }: MainContentProps) {
	if (source.content) {
		source.content
	}
	return (
		<main
			className={`markdown mx-auto w-full max-w-8xl px-8 text-foreground/70 ${blogStyles.markdown}`}
		>
			{source.content}
		</main>
	)
}
