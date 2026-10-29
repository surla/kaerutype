import { FEEDBACK_URL } from '../lib/constants'

const footerLinks = [
  { label: 'How it works', href: 'https://github.com/surla/kaerutype#readme' },
  { label: 'Privacy Policy', href: 'https://github.com/surla/kaerutype#readme' },
  { label: 'Feedback', href: FEEDBACK_URL },
]

export function Footer() {
  return (
    <footer className="mx-6 flex flex-col gap-3 border-t border-slate-200 py-6 text-sm text-slate-500 sm:mx-12 sm:flex-row sm:items-center sm:justify-between">
      <p>Japanese typing practice</p>
      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700 hover:underline"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
