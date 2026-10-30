import { useEffect } from 'react'

import { Layout } from './components/layout'
import { Results } from './features/typing/results'
import { TypingGame } from './features/typing/typing-game'
import { useTypingStore } from './features/typing/typing-store'

function App() {
  const start = useTypingStore((state) => state.start)
  const status = useTypingStore((state) => state.session.status)

  useEffect(() => {
    start()
  }, [start])

  return <Layout> {status === 'finished' ? <Results /> : <TypingGame />}</Layout>
}

export default App
