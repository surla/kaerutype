import { isWordComplete } from './typing-state'
import { useTypingStore } from './typing-store'
import { useTypingInput } from './use-typing-input'

export function TypingField() {
  useTypingInput()

  const wordState = useTypingStore((state) => state.wordState)

  if (!wordState) return null

  const isComplete = isWordComplete(wordState)
  const lockedRomaji = wordState.lockedInputs.join('')
  const isEmpty = lockedRomaji.length === 0 && wordState.buffer === ''

  return (
    <div className="relative w-full max-w-lg">
      <div
        role="status"
        aria-label="Typing progress"
        className={'flex min-h-16 w-full items-center justify-center px-6'}
      >
        <div className="flex min-w-0 items-center font-mono text-3xl tracking-wide sm:text-4xl">
          <span className="text-green-500">{lockedRomaji}</span>
          <span className="text-neutral-500">{wordState.buffer}</span>

          {!isComplete && !isEmpty && (
            <span
              aria-hidden="true"
              className="ml-0.5 h-7 w-0.5 shrink-0 animate-pulse bg-slate-900"
            />
          )}

          {isEmpty && (
            <span className="ml-3 font-sans text-xl text-slate-400">Type in romaji...</span>
          )}
        </div>
      </div>

      <input
        type="text"
        aria-label="Type here"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className="absolute inset-0 h-full w-full text-base opacity-0"
      />
    </div>
  )
}
