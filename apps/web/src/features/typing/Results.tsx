import { FEEDBACK_URL } from '../../constants'
import { formatResults } from './format-results'
import { useTypingStore } from './typing-store'

export function Results() {
  const stats = useTypingStore((state) => state.stats)
  const session = useTypingStore((state) => state.session)
  const restart = useTypingStore((state) => state.restart)

  const summary = formatResults(stats, session)

  const items = [
    { label: 'Words per minute', value: summary.wordsPerMinute },
    { label: 'Kana per minute', value: summary.kanaPerMinute },
    { label: 'Accuracy', value: summary.accuracy },
    { label: 'Words completed', value: summary.wordsCompleted },
  ]
  return (
    <main className="flex flex-col items-center px-6 py-16 text-center">
      <h1 className="text-6xl font-bold text-emerald-950">Results</h1>
      <p className="mt-3 text-xl text-slate-500">Nice typing!</p>

      <dl className="mt-14 flex flex-col gap-8 sm:flex-row sm:gap-0 sm:divide-x sm:divide-slate-200">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse px-10">
            <dt className="mt-1 text-lg text-slate-500">{item.label}</dt>
            <dd className="text-5xl font-semibold text-emerald-950 tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={restart}
        className="mt-14 w-full max-w-xs rounded-lg bg-green-600 py-4 text-lg font-medium text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Play again
      </button>

      <a
        href={FEEDBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 text-sm text-slate-500 hover:text-slate-700 hover:underline"
      >
        Help improve KaeruType <span aria-hidden="true">↗</span>
      </a>
    </main>
  )
}
