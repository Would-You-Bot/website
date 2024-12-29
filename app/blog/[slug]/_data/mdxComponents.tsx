import { Button } from '@/components/ui/button'

export const mdxComponents = {
	Button: Button,
	a: CustomLink
}

function CustomLink(props: any) {
	return (
		<a
			{...props}
			target="_blank"
		/>
	)
}
