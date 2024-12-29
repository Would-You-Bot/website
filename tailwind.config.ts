import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem'
		},
		extend: {
			screens: {
				xs: '480px',
				'2xl': '1400px'
			},
			maxWidth: {
				'8xl': '90rem',
				'9xl': '100rem'
			},
			colors: {
				brand: {
					primary: {
						DEFAULT: 'rgb(5, 152, 244)',
						light: 'rgb(60, 178, 251)'
					},
					secondary: {
						DEFAULT: 'rgb(5, 152, 244)',
						dark: {
							bg1: 'rgb(3, 122, 199)',
							bg2: 'rgb(23, 23, 23)',
							bg3: 'rgb(20, 20, 20)',
							bg3Hover: 'rgb(55, 56, 62)'
						},
						contentSubtle: 'rgb(178, 184, 205)'
					},
					gray: {
						border: 'rgb(255,255,255,0.1)',
						text: 'rgb(161, 161, 161)'
					},
					dark: {
						bgTransparent: 'rgb(31, 32, 35, 0.7)',
						bgTransparentDarker: 'rgb(0,0,0,0.5)',
						bgTransparentLighter: 'rgb(48, 49, 54, 0.7)'
					},
					blue: { 100: '#0598F4', 200: '#037ac7', 300: '#016cb0' },
					red: { 100: '#F00605', 200: '#b60505', 300: '#9a0404' }
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					dark: 'hsl(var(--background-dark))',
					darker: 'hsl(var(--background-darker))',
					light: 'hsl(var(--background-light))'
				},
				hover: {
					DEFAULT: 'hsl(var(--hover))',
					light: 'hsl(var(--hover-light))'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				status: {
					green: 'hsl(var(--status-green))',
					yellow: 'hsl(var(--status-yellow))',
					red: 'hsl(var(--status-red))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			dropShadow: {
				['red-glow']: ['2px 2px 10px #f00505'],
				['blue-glow']: ['2px 2px 10px #0598f6'],
				['gold-glow']: ['2px 2px 10px #eab308']
			},
			backgroundImage: {
				['gradient-premium']:
					'linear-gradient(to bottom right, #0598F4 0%,#F00605 100%)',
				['gradient-brand']:
					'linear-gradient(in oklch 90deg, #0598F4 25%, #F00605 85%)'
			},
			overflowWrap: {
				anywhere: 'anywhere',
				normal: 'normal',
				'break-word': 'break-word'
			}
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.overflow-wrap-anywhere': {
					'overflow-wrap': 'anywhere'
				},
				'.overflow-wrap-break': {
					'overflow-wrap': 'break-word'
				},
				'.overflow-wrap': {
					'overflow-wrap': 'normal'
				}
			})
		})
	]
} satisfies Config

export default config
