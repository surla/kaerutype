import { create } from 'zustand'

import { analytics } from '../../lib/analytics'

import type { TypingSession, TypingState, TypingStats, WordQueue } from './types'
import {
  createTypingSession,
  finishTypingSession,
  resetTypingSession,
  startTypingSession,
} from './typing-session'
import { backspace, createTypingState, typeChar } from './typing-state'
import { createTypingStats, recordKeystroke } from './typing-stats'
import { advanceQueue, createWordQueue, getCurrentWord } from './word-queue'
import { words } from './words'

type TypingStore = {
  queue: WordQueue
  wordState: TypingState | null
  session: TypingSession
  stats: TypingStats

  start: () => void
  nextWord: () => void
  type: (char: string, now: number) => void
  backspace: () => void

  startSession: (now: number) => void
  finishSession: (now: number) => void
  resetSession: () => void

  restart: () => void
}

export const useTypingStore = create<TypingStore>()((set) => ({
  queue: createWordQueue(words),
  wordState: null,
  session: createTypingSession(),
  stats: createTypingStats(),

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

  type: (char, now) =>
    set((state) => {
      if (!state.wordState) return state
      if (state.session.status === 'finished') return state

      const isNewSession = state.session.status === 'idle'

      if (isNewSession) {
        analytics.sessionStarted()
      }

      const previous = state.wordState
      const next = typeChar(state.wordState, char)

      return {
        wordState: next,
        session: startTypingSession(state.session, now),
        stats: recordKeystroke(state.stats, previous, next),
      }
    }),

  backspace: () =>
    set((state) => {
      if (!state.wordState) return state
      if (state.session.status === 'finished') return state

      return {
        wordState: backspace(state.wordState),
      }
    }),

  startSession: (now) =>
    set((state) => ({
      session: startTypingSession(state.session, now),
    })),

  finishSession: (now) => {
    set((state) => {
      const wasActive = state.session.status !== 'idle' && state.session.status !== 'finished'

      const session = finishTypingSession(state.session, now)

      if (wasActive && session.status === 'finished') {
        analytics.sessionCompleted()
      }

      return { session }
    })
  },

  resetSession: () => set({ session: resetTypingSession() }),

  restart: () => {
    analytics.sessionRestarted()

    set((state) => {
      const queue = createWordQueue(state.queue.words)
      const currentWord = getCurrentWord(queue)

      return {
        queue,
        wordState: currentWord ? createTypingState(currentWord.reading) : null,
        session: resetTypingSession(),
        stats: createTypingStats(),
      }
    })
  },
}))
