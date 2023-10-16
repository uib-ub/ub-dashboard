import { ThemeProvider } from '@/components/providers/theme-provider'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/providers/session-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { token } from '../../../sanity/lib/fetch'
import { Header } from '@/components/header'
import { PreviewIndicator } from '@/components/preview-indicator'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UB dashboard',
  description: 'Oversikt over UBs personer, grupper, tjenester og systemer',
}

const PreviewProvider = dynamic(() => import('@/components/providers/preview-provider'))

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {draftMode().isEnabled ? (
              <PreviewProvider token={token}>
                <Header />
                <Suspense>
                  {children}
                </Suspense>
              </PreviewProvider>
            ) : (
              <>
                <Header />
                {children}
              </>
            )}

            {draftMode().isEnabled ? (<PreviewIndicator />) : null}
            <TailwindIndicator />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
