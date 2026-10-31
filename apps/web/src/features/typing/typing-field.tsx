import { isWordComplete } from './typing-state'
import { useTypingStore } from './typing-store'
import { useTypingInput } from './use-typing-input'

export function TypingField() {
  useTypingInput()

  const wordState = useTypingStore((state) => state.wordState)

  if (!wordState) return null

  const lockedKana = wordState.kanaUnits.slice(0, wordState.index)
  const isComplete = isWordComplete(wordState)
  const isEmpty = lockedKana.length === 0 && !wordState.buffer

  return (
    <div
      role="status"
      aria-label="Typing progress"
      className={`flex min-h-20 w-full max-w-lg items-center justify-center rounded-4xl border bg-white px-6 text-2xl shadow-sm transition-colors duration-150 sm:min-h-24 ${isComplete ? 'border-green-500' : 'border-slate-200'}`}
    >
      <div className="flex min-w-0 items-center">
        {lockedKana.map((unit, index) => (
          <span key={index} className="text-green-500">
            {unit.kana}
          </span>
        ))}
        <span className="text-neutral-500">{wordState.buffer}</span>

        {!isComplete && !isEmpty && (
          <span
            aria-hidden="true"
            className="ml-0.5 h-7 w-0.5 shrink-0 animate-pulse bg-slate-900"
          />
        )}

        {isEmpty && <span className="ml-3 text-slate-400">Type in romaji...</span>}
      </div>
    </div>
  )
}
