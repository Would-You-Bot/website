"use server";

import type { CompileMDXResult } from "next-mdx-remote/rsc";
import type { FrontMatter } from "@/app/blog/[slug]/_data";
import blogStyles from "@/styles/blog.module.css";
import { TableOfContents } from "./TableOfContents";
import { cn } from "@/lib/utils";

interface MainContentProps {
	source: CompileMDXResult<FrontMatter>;
	toc?: string[];
}

export async function MainContent({ source, toc }: MainContentProps) {
	if (source.content) {
		source.content;
	}
	return (
		<main className="markdown flex flex-col lg:flex-row gap-6 mx-auto w-full max-w-8xl px-8 text-foreground/70">
			{toc && (
				<div className="lg:order-last min-w-52 relative">
					<TableOfContents toc={toc ?? []} />
				</div>
			)}
			<div className={cn("", blogStyles.markdown)}>{source.content}</div>
		</main>
	);
}
