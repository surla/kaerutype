import { useEffect } from 'react'

import { TypingField } from './features/typing/typing-field'
import { isWordComplete } from './features/typing/typing-state'
import { useTypingStore } from './features/typing/typing-store'
import { WordDisplay } from './features/typing/word-display'
import { getCurrentWord } from './features/typing/word-queue'

const FLASH_MS = 225

function App() {
  const start = useTypingStore((state) => state.start)
  const nextWord = useTypingStore((state) => state.nextWord)
  const wordState = useTypingStore((state) => state.wordState)
  const currentWord = useTypingStore((state) => getCurrentWord(state.queue))

  useEffect(() => {
    start()
  }, [start])

  useEffect(() => {
    if (!wordState || !isWordComplete(wordState)) return

    const timeoutId = setTimeout(() => {
      nextWord()
    }, FLASH_MS)
    return () => clearTimeout(timeoutId)
  }, [wordState, nextWord])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">kaerutype</h1>
      <WordDisplay text={currentWord?.word ?? ''} />
      <TypingField />
    </main>
  )
}

export default App
