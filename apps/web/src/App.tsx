import { useEffect } from 'react'

import { Results } from './features/typing/Results'
import { Timer } from './features/typing/Timer'
import { TypingField } from './features/typing/typing-field'
import { WordDisplay } from './features/typing/word-display'

import { useTypingStore } from './features/typing/typing-store'

import { isWordComplete } from './features/typing/typing-state'
import { getCurrentWord } from './features/typing/word-queue'

const FLASH_MS = 225

function App() {
  const start = useTypingStore((state) => state.start)
  const status = useTypingStore((state) => state.session.status)
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

  return status === 'finished' ? (
    <Results />
  ) : (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">kaerutype</h1>
      <Timer />
      <WordDisplay text={currentWord?.word ?? ''} />
      <TypingField />
    </main>
  )
}

export default App
