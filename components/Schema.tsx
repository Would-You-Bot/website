import type { JSX } from "react";
export function Schema({ json }: { json: string }): JSX.Element {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: json }}
		/>
	)
}
