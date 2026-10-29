import type { ReactNode } from 'react'

import { Footer } from './footer'
import { Header } from './header'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
