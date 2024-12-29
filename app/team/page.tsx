import Head from 'next/head'

import Image from 'next/image' // Import the 'Image' component

import GlowingHeading from '@/components/GlowingHeading'
import staffs from '@/data/staffs.json' // Import the JSON data

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
			<Head>
				<title>Would You - Team</title>
			</Head>
			<main className="flex flex-col items-center">
				<div className="flex mt-auto w-full max-w-8xl flex-col px-8">
					<GlowingHeading
						redText="Meat the"
						blueText="Team"
					/>
					<p className="text-muted-foreground">
						Meet the amazing team and contributors behind Would You.
					</p>
				</div>
				<div className="mx-auto h-full max-w-5xl justify-center text-center">
					{roles.map((role, i) => (
						<>
							<h2
								key={role}
								className="mt-10 select-none font-semibold text-foreground/70"
							>
								{role}
							</h2>
							<ul
								key={i}
								role="list"
								className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-6 text-pretty px-6 lg:mx-0 lg:max-w-none lg:gap-8 lg:px-8"
							>
								{staffs
									.filter((staff) => staff.categories.includes(role))
									.map((staff) => (
										<li
											key={staff.name}
											className="flex basis-full transform cursor-default flex-col content-center rounded-2xl bg-background-light px-4 py-8 shadow-lg transition duration-300 ease-in-out hover:shadow-2xl sm:basis-[calc(50%-1.5rem)] sm:px-6 lg:basis-[calc(25%-2rem)] lg:px-8 lg:hover:-translate-y-2 xl:px-10"
										>
											<Image
												className="mx-auto h-28 w-28 rounded-full md:h-24 md:w-24"
												src={staff.imageUrl}
												width={128}
												height={128}
												alt=""
											/>
											<h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-foreground">
												{staff.name}
											</h3>
											<p className="text-sm leading-6 text-foreground/60">
												{staff.description}
											</p>
											{staff.websiteUrl !== null ?
												<ul
													role="list"
													className="mt-6 flex justify-center align-bottom"
												>
													<li
														className="absolute bottom-5 left-1/2 -translate-x-1/2"
														key={staff.websiteUrl}
													>
														<a
															href={staff.websiteUrl} // Use the correct variable name
															target="_blank"
															className="text-foreground/60 hover:text-foreground/80"
														>
															<span className="sr-only">website link</span>
															<svg
																className="h-5 w-5"
																aria-hidden="true"
																fill="currentColor"
																viewBox="0 0 120 120"
															>
																<switch>
																	<g>
																		<path d="M60 120C26.9 120 0 93.1 0 60S26.9 0 60 0s60 26.9 60 60-26.9 60-60 60M60 5C29.7 5 5 29.7 5 60s24.7 55 55 55 55-24.7 55-55S90.3 5 60 5" />
																		<path d="M60 120c-19.3 0-34.4-26.4-34.4-60S40.7 0 60 0s34.4 26.4 34.4 60-15.1 60-34.4 60M60 5C43.8 5 30.5 29.7 30.5 60s13.2 55 29.5 55 29.5-24.7 29.5-55S76.2 5 60 5" />
																		<path d="M12.2 25.6h95.6v5H12.2zm0 63.9h95.6v5H12.2zm-9.7-32h115v5H2.5z" />
																		<path d="M57.5 2.5h5v115h-5z" />
																	</g>
																</switch>
															</svg>
														</a>
													</li>
												</ul>
											:	null}
										</li>
									))}{' '}
							</ul>
						</>
					))}{' '}
				</div>
			</main>
		</>
	)
}
