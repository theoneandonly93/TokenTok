import type { Metadata } from 'next'
import './globals.css'
import SolanaWalletProvider from '@/components/WalletProvider'

export const metadata: Metadata = {
  title: 'Launchpad Live',
  description: 'TikTok-style token launchpad with real tokens and livestreams',
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  )
}
