import { useEffect } from 'react'

import { TypingField } from './features/typing/typing-field'
import { isWordComplete } from './features/typing/typing-state'
import { useTypingStore } from './features/typing/typing-store'
import { WordDisplay } from './features/typing/word-display'

const TEST_WORD = { text: '漢字', reading: 'かんじ' }
const FLASH_MS = 225

function App() {
  const start = useTypingStore((state) => state.start)
  const wordState = useTypingStore((state) => state.wordState)

  // Temporary: start a hardcoded word until the word list exists
  useEffect(() => {
    start(TEST_WORD.reading)
  }, [start])

  // Temporary: restart the same word after a short flash on completion
  useEffect(() => {
    if (!wordState || !isWordComplete(wordState)) return

    const timeoutId = setTimeout(() => {
      start(TEST_WORD.reading)
    }, FLASH_MS)
    return () => clearTimeout(timeoutId)
  }, [wordState, start])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">kaerutype</h1>
      <WordDisplay text={TEST_WORD.text} />
      <TypingField />
    </main>
  )
}

export default App
