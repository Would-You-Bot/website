"use server";

import { cn } from "@/lib/utils";

interface TableOfContentsProps {
	toc: string[];
	className?: string;
}

export const TableOfContents = async ({ toc }: TableOfContentsProps) => {
	if (toc.length === 0) return null;
	return (
		<div className="flex max-w-full flex-col gap-1 xl:max-w-[200px] 2xl:max-w-[240px] border-foreground/50 border-b pb-4 lg:pb-0 lg:border-0 lg:px-4 lg:sticky lg:top-28">
			<p className="mb-1 font-semibold text-foreground">TABLE OF CONTENTS</p>
			<ol className="list-none">
				{toc.map((x) => (
					<li key={x} className="mt-3">
						<p className="text-sm text-foreground/60">{x}</p>
					</li>
				))}
			</ol>
		</div>
	);
};
