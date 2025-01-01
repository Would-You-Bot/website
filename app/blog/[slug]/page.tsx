import { MainContent, TableOfContents } from '@/app/blog/[slug]/_components'
import { getPost } from '@/app/blog/[slug]/_data'
import { Metadata, Viewport } from 'next'
import { postPaths } from '@/utils/mdx'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const params = await props.params

	const { slug } = params

	const { frontmatter } = await getPost(slug)
	const title = frontmatter.title + '- Would You Bot'

	return {
		title,
		description: frontmatter.description,
		metadataBase: new URL('https://wouldyoubot.gg/'),
		alternates: {
			canonical: '/'
		},
		twitter: {
			title,
			description: frontmatter.description,
			card: 'summary_large_image',
			images: frontmatter.thumbnail?.large
		},
		openGraph: {
			title,
			publishedTime: frontmatter.seoDate,
			type: 'article',
			description: frontmatter.description,
			authors: frontmatter.author.name,
			tags: frontmatter.tags,
			images: frontmatter.thumbnail?.large
		},
		robots: {
			index: true,
			follow: true
		}
	}
}

export const viewport: Viewport = {
	maximumScale: 5,
	themeColor: '#0598F6'
}

export function generateStaticParams() {
	return postPaths
		.map((path) => path.replace(/\.mdx?$/, ''))
		.map((slug) => ({ slug }))
}

const BlogPost = async (props: { params: Promise<{ slug: string }> }) => {
	const params = await props.params

	const { slug } = params

	const result = await getPost(slug)
	const { frontmatter: frontMatter } = result

	return (
		<>
			<div className="w-full max-w-8xl mx-auto px-8 text-foreground/70">
				<Link
					href="/blog"
					className="text-foreground/70 transition-all hover:text-foreground"
				>
					<p className="mb-4">&larr; Back</p>
				</Link>
				{frontMatter.thumbnail?.banner && (
					<Image
						src={frontMatter.thumbnail.banner}
						alt={frontMatter.title + '- Would You Bot'}
						width={1000}
						height={200}
						className="mb-4 h-auto w-full rounded-lg"
					/>
				)}
				<h1 className="text-4xl font-bold text-foreground">
					{frontMatter.title}
				</h1>
				<p className="mt-4">{frontMatter.description}</p>
				<div className="mt-4 flex items-center">
					<Image
						src={frontMatter.author.avatar}
						alt={frontMatter.author.name}
						width={30}
						height={30}
						className="h-10 w-10 rounded-full"
					/>
					<div className="ml-4">
						<p className="text-foreground/70">{frontMatter.author.name}</p>
						<p className="text-sm text-foreground/40">{frontMatter.date}</p>
					</div>
				</div>
				<div className="my-4 flex flex-wrap gap-1 border-b border-b-foreground/50 pb-4">
					{frontMatter.tags.map((tag) => (
						<p
							key={tag}
							className="min-w-fit rounded-full border border-foreground/50 px-2 py-1 text-xs text-foreground/70"
						>
							{tag}
						</p>
					))}
				</div>
				<div className="xl: relative left-0 top-0 mb-10 flex border-b border-foreground/50 pb-5 xl:fixed xl:left-4 xl:top-40 xl:border-b-0">
					<TableOfContents toc={frontMatter.toc ?? []} />
				</div>
			</div>

			<MainContent source={result} />
		</>
	)
}

export default BlogPost
