import { create } from 'zustand'

import type { TypingState, WordQueue } from './types'
import { backspace, createTypingState, typeChar } from './typing-state'
import { advanceQueue, createWordQueue, getCurrentWord } from './word-queue'
import { words } from './words'

type TypingStore = {
  queue: WordQueue
  wordState: TypingState | null
  start: () => void
  nextWord: () => void
  type: (char: string) => void
  backspace: () => void
}

export const useTypingStore = create<TypingStore>()((set) => ({
  queue: createWordQueue(words),
  wordState: null,
  start: () =>
    set((state) => {
      const currentWord = getCurrentWord(state.queue)

      return {
        wordState: currentWord ? createTypingState(currentWord.reading) : null,
      }
    }),
  nextWord: () =>
    set((state) => {
      const queue = advanceQueue(state.queue)
      const currentWord = getCurrentWord(queue)

      return {
        queue,
        wordState: currentWord ? createTypingState(currentWord.reading) : null,
      }
    }),
  type: (char) =>
    set((state) => ({
      wordState: state.wordState ? typeChar(state.wordState, char) : null,
    })),
  backspace: () =>
    set((state) => ({
      wordState: state.wordState ? backspace(state.wordState) : null,
    })),
}))
