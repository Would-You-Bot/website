export default async function loadGoogleFont(font: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}:opsz,wght@14..32,600..900&display=swap" rel="stylesheet`
	const css = await (await fetch(url)).text()
	const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

	if (resource) {
		const response = await fetch(resource[1])
		if (response.status == 200) {
			return await response.arrayBuffer()
		}
	}

	throw new Error('failed to load font data')
}