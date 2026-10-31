import { useEffect } from 'react'

import { Timer } from './timer'
import { TypingField } from './typing-field'
import { isWordComplete } from './typing-state'
import { useTypingStore } from './typing-store'
import { WordDisplay } from './word-display'
import { getCurrentWord } from './word-queue'

const FLASH_MS = 225

export function TypingGame() {
  const nextWord = useTypingStore((state) => state.nextWord)
  const wordState = useTypingStore((state) => state.wordState)
  const currentWord = useTypingStore((state) => getCurrentWord(state.queue))

  useEffect(() => {
    if (!wordState || !isWordComplete(wordState)) return

    const timeoutId = setTimeout(() => {
      nextWord()
    }, FLASH_MS)

    return () => clearTimeout(timeoutId)
  }, [wordState, nextWord])

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <Timer />

      <div className="mt-16 mb-12">
        <WordDisplay text={currentWord?.word ?? ''} />
      </div>

      <TypingField />
    </div>
  )
}
