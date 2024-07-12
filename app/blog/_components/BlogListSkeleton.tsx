"use server"

export async function BlogListSkeleton() {
  return (
    <>
      <ListItemSkeleton />
      <ListItemSkeleton />
      <ListItemSkeleton />
    </>
  )
}

/**
 * @private
 */
function ListItemSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-lg bg-neutral-800 p-4">
      <div className="flex flex-col gap-3">
        <div className="flex w-full items-center justify-start gap-3">
          <div className="h-[40px] w-[40px] animate-pulse rounded-full bg-neutral-700" />
          <div className="h-[20px] w-3/4 animate-pulse rounded-lg bg-neutral-700 sm:w-1/2 md:w-1/4" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-[20px] w-1/2 animate-pulse rounded-lg bg-neutral-700 md:w-1/4 lg:w-1/6" />
          <div className="h-[20px] w-full animate-pulse rounded-lg bg-neutral-700 sm:w-3/4" />
        </div>
      </div>
    </div>
  )
}
