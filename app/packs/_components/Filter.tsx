'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Hash, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const packTypes = [
  {
    id: 'qwertyuiop12',
    label: 'Would You Rather',
    slug: 'wouldyourather'
  },
  {
    id: 'asdfghjkl12',
    label: 'What Would You Do',
    slug: 'whatwouldyoudo'
  },
  {
    id: 'zxcvbnm12',
    label: 'Never Have I Ever',
    slug: 'neverhaveiever'
  },
  {
    id: 'djwne0i2we',
    label: 'Truth',
    slug: 'truth'
  },
  {
    id: 'ojeijded23',
    label: 'Dare',
    slug: 'dare'
  },
  {
    id: 'jdfoenD69d',
    label: 'Topic',
    slug: 'topic'
  },
  {
    id: 'djei3jD9e2',
    label: 'Mixed',
    slug: 'mixed'
  }
]

function Filter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = searchParams.get('type')

  function selectType(type: string) {
    const params = new URLSearchParams(searchParams.toString())
    type === 'all' ? params.delete('type') : params.set('type', type)
    router.push('?' + params.toString(), { scroll: false })
  }

  function setSearch(query: string) {
    const params = new URLSearchParams(searchParams.toString())
    query.length > 0 ? params.set('query', query) : params.delete('query')
    router.push('?' + params.toString(), { scroll: false })
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
        <div className="relative w-full">
          <label
            htmlFor="search"
            className="sr-only"
          >
            Search for a pack
          </label>
          <Search className="size-4 absolute left-4 bottom-3 lg:bottom-4 dark:text-[#666666]" />
          <Input
            type="search"
            id="search"
            name="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 lg:h-12 dark:bg-[#1D1D1D]"
          />
        </div>
        <Button
          asChild
          variant="secondary"
          className="sm:w-fit h-auto"
        >
          <Link
            href="/packs/create"
            className="space-x-2 flex-1"
          >
            <Plus size={16} />
            <span>Create Pack</span>
          </Link>
        </Button>
      </div>
      <div className="w-full overflow-x-auto py-2 thin-scrollbar">
        <div className="flex space-x-2 whitespace-nowrap">
          <button
            type="button"
            onClick={() => selectType('all')}
            className={cn(
              'flex items-center gap-1 px-2 py-1.5 text-muted-foreground text-xs rounded-md bg-background-light cursor-pointer shrink-0',
              {
                'bg-brand-customPrimary text-white': !t
              }
            )}
          >
            <span>
              <Hash size={14} />
            </span>
            <span>All</span>
          </button>
          {packTypes.map((type) => (
            <button
              type="button"
              key={type.id}
              onClick={() => selectType(type.slug)}
              className={cn(
                'flex items-center gap-1 px-2 py-1.5 text-muted-foreground text-xs rounded-md bg-background-light cursor-pointer',
                {
                  'bg-brand-customPrimary text-white': t && t === type.slug
                }
              )}
            >
              <span>
                <Hash size={14} />
              </span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Filter
