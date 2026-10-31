import { isWordComplete } from './typing-state'
import { useTypingStore } from './typing-store'

type WordDisplayProps = {
  text: string
}

export function WordDisplay({ text }: WordDisplayProps) {
  const wordState = useTypingStore((state) => state.wordState)

  if (!wordState) return null

  const isComplete = isWordComplete(wordState)

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p
        className={`text-6xl font-semibold sm:text-7xl ${isComplete ? 'text-green-500' : 'text-slate-900'}`}
      >
        {text}
      </p>
      <p className="text-3xl sm:text-4xl">
        {wordState.kanaUnits.map((unit, index) => {
          return (
            <span
              key={index}
              className={index < wordState.index ? 'text-green-500' : 'text-slate-500'}
            >
              {unit.kana}
            </span>
          )
        })}
      </p>
    </div>
  )
}
