import { useEffect } from 'react'

import { Layout } from './components/layout'
import { Results } from './features/typing/Results'
import { Timer } from './features/typing/Timer'
import { TypingField } from './features/typing/typing-field'
import { WordDisplay } from './features/typing/word-display'

import { isWordComplete } from './features/typing/typing-state'
import { useTypingStore } from './features/typing/typing-store'
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

  return (
    <Layout>
      {' '}
      {status === 'finished' ? (
        <Results />
      ) : (
        <main className="flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-bold">kaerutype</h1>
          <Timer />
          <WordDisplay text={currentWord?.word ?? ''} />
          <TypingField />
        </main>
      )}
    </Layout>
  )
}

export default App
