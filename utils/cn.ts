export function cn(...args: Array<string | undefined | null>): string {
	return args.filter(Boolean).join(' ')
}
