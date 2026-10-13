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
    <div className="text-center">
      <p className={`text-5xl ${isComplete ? 'text-green-500' : 'text-neutral-700'}`}>{text}</p>
      <p className="text-xl">
        {wordState.kanaUnits.map((unit, index) => {
          return (
            <span
              key={index}
              className={index < wordState.index ? 'text-green-500' : 'text-neutral-400'}
            >
              {unit.kana}
            </span>
          )
        })}
      </p>
    </div>
  )
}
