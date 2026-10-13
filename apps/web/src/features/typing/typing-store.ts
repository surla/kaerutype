import { create } from 'zustand'

import { backspace, createTypingState, typeChar } from './typing-state'
import type { TypingState } from './types'

type TypingStore = {
  wordState: TypingState | null
  start: (word: string) => void
  type: (char: string) => void
  backspace: () => void
}

export const useTypingStore = create<TypingStore>()((set) => ({
  wordState: null,
  start: (word) => set(() => ({ wordState: createTypingState(word) })),
  type: (char) =>
    set((state) => ({
      wordState: state.wordState ? typeChar(state.wordState, char) : null,
    })),
  backspace: () =>
    set((state) => ({
      wordState: state.wordState ? backspace(state.wordState) : null,
    })),
}))
