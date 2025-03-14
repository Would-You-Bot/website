import sharp from 'sharp'
import axios from 'axios'

export default async function getImageBase64(url: string) {
	return axios
		.get<ArrayBuffer>(url, {
			responseType: 'arraybuffer'
		})
		.then(async (res) => {
			const buffer = await sharp(res.data).toFormat('png').toBuffer()
			return {
				url: `data:${'image/png'};base64,${buffer.toString('base64')}`
			}
		})
}
