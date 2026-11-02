import { useEffect } from 'react'

import { Results } from '../features/typing/results'
import { TypingGame } from '../features/typing/typing-game'
import { useTypingStore } from '../features/typing/typing-store'

export function HomePage() {
  const start = useTypingStore((state) => state.start)
  const status = useTypingStore((state) => state.session.status)

  useEffect(() => {
    start()
  }, [start])

  return status === 'finished' ? <Results /> : <TypingGame />
}
