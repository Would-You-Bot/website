import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<Toaster />
		</ThemeProvider>
	)
}

export default Providers
