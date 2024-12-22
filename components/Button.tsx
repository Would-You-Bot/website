import { VariantProps, cva } from 'class-variance-authority'

const button = cva('flex items-center rounded-lg px-6 py-3 transition-all', {
	variants: {
		variant: {
			blue: 'bg-brand-blue-100 hover:bg-brand-blue-200 text-white',
			red: 'bg-brand-red-100 hover:bg-brand-red-200 text-white'
		}
	},
	defaultVariants: {
		variant: 'blue'
	}
})

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof button> {}

const Button: React.FC<ButtonProps> = ({ className, variant, ...props }) => (
	<button
		className={button({ variant, className })}
		{...props}
	/>
)

export default Button
