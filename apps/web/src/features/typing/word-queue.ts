import { shuffle } from './shuffle'
import type { Word, WordQueue } from './types'

export function createWordQueue(words: Word[]): WordQueue {
  const shuffledWords = shuffle(words)
  return {
    words: shuffledWords,
    index: 0,
  }
}

export function getCurrentWord(queue: WordQueue): Word | null {
  return queue.words[queue.index] || null
}
