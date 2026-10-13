import { useTypingStore } from './typing-store'
import { useTypingInput } from './use-typing-input'

export function TypingField() {
  useTypingInput()

  const wordState = useTypingStore((state) => state.wordState)

  if (!wordState) return null

  const lockedKana = wordState.kanaUnits.slice(0, wordState.index)

  return (
    <div className="mx-auto min-h-16 w-full max-w-md rounded-3xl border border-neutral-300 p-3 text-center text-2xl">
      {lockedKana.map((unit, index) => (
        <span key={index} className="text-green-500">
          {unit.kana}
        </span>
      ))}
      <span className="text-neutral-500">{wordState.buffer}</span>
    </div>
  )
}
