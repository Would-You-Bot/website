import type { Metadata, Viewport } from 'next'
import staffs from '@/data/staffs.json' // Import the JSON data
import Image from 'next/image' // Import the 'Image' component
import { Fragment } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  title: 'Our Team - Would You Bot',
  description: 'Meet the amazing team and contributors behind Would You.',
  twitter: {
    title: 'Our Team - Would You Bot',
    description: 'Meet the amazing team and contributors behind Would You.'
  },
  openGraph: {
    title: 'Our Team - Would You Bot',
    description: 'Meet the amazing team and contributors behind Would You.'
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  themeColor: '#0598F6',
  maximumScale: 5
}

export default function Team() {
  const roles = [
    'Developers',
    'Admins',
    'Translators',
    'Contributors',
    'Beta Testers'
  ]

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex mt-auto w-full max-w-8xl flex-col px-8">
          <h1 className="text-4xl font-bold text-foreground">
            <span className="text-brand-red-100 drop-shadow-red-glow">
              Meet{' '}
            </span>{' '}
            <span className="text-brand-blue-100 drop-shadow-blue-glow">
              {' '}
              the{' '}
            </span>
            Team
          </h1>
          <p className="text-foreground/50">
            Meet the amazing team and contributors behind Would You.
          </p>
        </div>
        <div className="mx-auto h-full max-w-5xl justify-center text-center">
          {roles.map((role) => (
            <Fragment key={role}>
              <h2
                className="mt-10 select-none font-semibold text-foreground/70"
              >
                {role}
              </h2>
              <ul
                role="list"
                className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-6 text-pretty px-6 lg:mx-0 lg:max-w-none lg:gap-8 lg:px-8"
              >
                {staffs
                  .filter((staff) => staff.categories.includes(role))
                  .map((staff) => (
                    <li
                      key={staff.name}
                      className="flex basis-full cursor-default flex-col content-center rounded-2xl bg-background-light px-4 py-8 shadow-lg sm:basis-[calc(50%-1.5rem)] sm:px-6 lg:basis-[calc(25%-2rem)] lg:px-8 xl:px-10"
                    >
                      <Image
                        className="mx-auto h-28 w-28 rounded-full md:h-24 md:w-24"
                        src={staff.imageUrl}
                        width={128}
                        height={128}
                        alt={`${staff.name}'s profile picture`}
                      />
                      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-foreground">
                        {staff.websiteUrl !== null ?
                          <a
                            href={staff.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-foreground/80"
                          >
                            {staff.name}
                          </a>
                        : staff.name}
                      </h3>
                      <p className="text-sm leading-6 text-foreground/60">
                        {staff.description}
                      </p>
                    </li>
                  ))}{' '}
              </ul>
            </Fragment>
          ))}{' '}
        </div>
      </main>
    </>
  )
}
