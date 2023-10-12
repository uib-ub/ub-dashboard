import { ThemeProvider } from '@/components/provider/theme-provider'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/provider/provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { token } from '../../../sanity/lib/fetch'
import { Header } from '@/components/header'
import { PreviewIndicator } from '@/components/preview-indicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UB dashboard',
  description: 'Oversikt over UBs personer, grupper, tjenester og systemer',
}

const PreviewProvider = dynamic(() => import('../../components/provider/preview-provider'))

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {draftMode().isEnabled ? (
              <PreviewProvider token={token}>
                <div>
                  <Header />
                  {children}
                </div>
              </PreviewProvider>
            ) : (
              <>
                <Header />
                {children}
              </>
            )}

            {draftMode().isEnabled ? (<PreviewIndicator />) : null}
            <TailwindIndicator />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
