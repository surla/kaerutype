import { create } from 'zustand'

import type { TypingSession, TypingState, WordQueue } from './types'
import {
  createTypingSession,
  finishTypingSession,
  resetTypingSession,
  startTypingSession,
} from './typing-session'
import { backspace, createTypingState, typeChar } from './typing-state'
import { advanceQueue, createWordQueue, getCurrentWord } from './word-queue'
import { words } from './words'

type TypingStore = {
  queue: WordQueue
  wordState: TypingState | null
  session: TypingSession

  start: () => void
  nextWord: () => void
  type: (char: string) => void
  backspace: () => void

  startSession: (now: number) => void
  finishSession: (now: number) => void
  resetSession: (now: number) => void
}

export const useTypingStore = create<TypingStore>()((set) => ({
  queue: createWordQueue(words),
  wordState: null,
  session: createTypingSession(),

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

  startSession: (now) =>
    set((state) => ({
      session: startTypingSession(state.session, now),
    })),

  finishSession: (now) =>
    set((state) => ({
      session: finishTypingSession(state.session, now),
    })),

  resetSession: () => set({ session: resetTypingSession() }),
}))
