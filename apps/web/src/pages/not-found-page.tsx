import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 underline">
        Back to the game
      </Link>
    </main>
  )
}
