import { useEffect } from 'react'

import { TypingField } from './features/typing/typing-field'
import { useTypingStore } from './features/typing/typing-store'
import { WordDisplay } from './features/typing/word-display'

const TEST_WORD = { text: '漢字', reading: 'かんじ' }

function App() {
  const start = useTypingStore((state) => state.start)

  useEffect(() => {
    start(TEST_WORD.reading)
  }, [start])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">kaerutype</h1>
      <WordDisplay text={TEST_WORD.text} />
      <TypingField />
    </main>
  )
}

export default App
