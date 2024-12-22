import { readdirSync } from 'fs'
import path from 'path'

export const POST_PATH = path.join(process.cwd(), 'posts')

export const postPaths = readdirSync(POST_PATH)
	.filter((path) => path.charAt(0) !== '_')
	.filter((path) => /\.mdx?$/.test(path))
