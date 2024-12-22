import { POST_PATH, postPaths } from '@/utils/mdx'
import { readFile } from 'node:fs/promises'
import matter from 'gray-matter'
import { cache } from 'react'
import path from 'node:path'

export type Post = {
	content: string
	data: {
		title: string
		description: string
		date: string
		seoDate: string
		thumbnail?: {
			large?: string
			banner?: string
			alt?: string
		}
		author: {
			name: string
			avatar: string
		}
		tags: string[]
		pinned?: boolean
	}
	filePath: string
}

export const getPosts = cache(async (): Promise<Post[]> => {
	const buffers = await Promise.all(
		postPaths.map((filePath) => readFile(path.join(POST_PATH, filePath)))
	)
	return buffers.map((buffer, i) => {
		const { content, data } = matter(buffer)

		return {
			content,
			data,
			filePath: postPaths[i]
		}
	}) as Post[]
})
