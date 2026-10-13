import { useEffect } from 'react'

import { TypingField } from './features/typing/typing-field'
import { useTypingStore } from './features/typing/typing-store'

function App() {
  const start = useTypingStore((state) => state.start)

  // Temporary: start a hardcoded word until the word list exists
  useEffect(() => {
    start('かんじ')
  }, [start])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-center text-3xl font-bold">kaerutype</h1>
      <TypingField />
    </main>
  )
}

export default App
