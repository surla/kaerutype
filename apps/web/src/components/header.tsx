import { APP_VERSION } from '../lib/constants'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-12">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-3xl">
          🐸
        </span>
        <span className="text-2xl font-bold text-emerald-950">kaerutype</span>
      </div>
      <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm text-emerald-900">
        beta v{APP_VERSION}
      </span>
    </header>
  )
}
