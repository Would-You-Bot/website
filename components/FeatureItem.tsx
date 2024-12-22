import { m } from 'framer-motion'

const FeatureItem: React.FC<{
	left: React.ReactNode
	right: React.ReactNode
	reverse?: true
}> = ({ left, right, reverse }) => (
	<div className="flex w-full flex-col justify-between gap-8 md:flex-row md:gap-20">
		<m.div
			initial={{ opacity: 0, transform: 'translateX(-50px)' }}
			whileInView={{ opacity: 1, transform: 'translateX(0)' }}
			viewport={{ once: true }}
			transition={{ duration: 0.65, ease: 'easeInOut' }}
			className="mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2"
		>
			{left}
		</m.div>
		<m.div
			initial={{ opacity: 0, transform: 'translateX(50px)' }}
			whileInView={{ opacity: 1, transform: 'translateX(0)' }}
			viewport={{ once: true }}
			transition={{ duration: 0.65, ease: 'easeInOut' }}
			className={`mx-auto flex flex-col justify-center gap-2 sm:w-2/3 md:w-1/2 ${
				reverse ? 'order-last md:order-first' : ''
			}`}
		>
			{right}
		</m.div>
	</div>
)

export default FeatureItem
