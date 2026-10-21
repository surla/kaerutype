import { useEffect } from 'react'

import { useTypingStore } from './typing-store'

export function useTypingInput() {
  const type = useTypingStore((state) => state.type)
  const backspace = useTypingStore((state) => state.backspace)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return

      if (event.key === 'Backspace') {
        event.preventDefault()
        backspace()
      } else if (event.key.length === 1) {
        event.preventDefault()
        type(event.key.toLowerCase(), Date.now())
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [type, backspace])
}
