'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink
} from '@/components/ui/pagination'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

function PacksPagination({ totalPages }: { totalPages: number }) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()
	const POSTS_PER_PAGE = 15
	const SIBLING_PAGES = 1
	const currentPage =
		searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1

	const hasPreviousPage = currentPage > 1
	const hasNextPage = currentPage <= totalPages - 1

	const createQueryString = (pageNum: number) => {
		const params = new URLSearchParams(searchParams.toString())

		if (pageNum === null || pageNum === 1) {
			params.delete('page')
		} else {
			params.set('page', pageNum.toString())
		}

		return params ? '?' + params.toString() : pathname
	}

	const handlePageChange = (pageNum: number) => {
		const query = createQueryString(pageNum)
		router.push(query)
	}

	const generatePageNumbers = () => {
		const pageNumbers = []

		if (totalPages <= 5) {
			// show all page numbers
			for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)
		} else {
			const leftSiblingIndex = Math.max(2, currentPage - 1)
			const rightSiblingIndex = Math.min(totalPages - 1, currentPage + 1)

			// Ellipsis after first page
			if (currentPage > 3) pageNumbers.push(null)

			// Show a range of pages around the current page
			for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
				if (i > 1 && i < totalPages) {
					pageNumbers.push(i)
				}
			}
			// Ellipsis before last page
			if (currentPage < totalPages - 2) pageNumbers.push(null)
		}

		return pageNumbers
	}

	return (
		<Pagination>
			<PaginationContent className="max-md:justify-between max-md:w-full">
				<PaginationItem>
					<Button
						className="gap-1"
						variant="ghost"
						disabled={!hasPreviousPage}
						onClick={() => handlePageChange(currentPage - 1)}
						aria-label="Go to previous page"
					>
						<ChevronLeft className="size-4" />
						<span>Previous</span>
					</Button>
				</PaginationItem>

				<PaginationItem className="hidden md:block">
					<PaginationLink
						href={createQueryString(1)}
						isActive={currentPage === 1}
					>
						1
					</PaginationLink>
				</PaginationItem>

				{/* Page Numbers and Ellipses */}
				{generatePageNumbers().map((pageNumber, index) => (
					<PaginationItem
						className="hidden md:block"
						key={index}
					>
						{pageNumber ?
							<PaginationLink
								href={createQueryString(pageNumber)}
								isActive={pageNumber === currentPage}
							>
								{pageNumber}
							</PaginationLink>
						:	<PaginationEllipsis />}
					</PaginationItem>
				))}

				<PaginationItem className="hidden md:block">
					<PaginationLink
						href={createQueryString(totalPages)}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>

				<PaginationItem>
					<Button
						className="gap-1"
						variant="ghost"
						disabled={!hasNextPage}
						onClick={() => handlePageChange(currentPage + 1)}
						aria-label="Go to next page"
					>
						<span>Next</span>
						<ChevronRight className="size-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

export default PacksPagination
