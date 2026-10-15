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

export function advanceQueue(queue: WordQueue): WordQueue {
  const nextIndex = queue.index + 1

  if (nextIndex < queue.words.length) {
    return {
      ...queue,
      index: nextIndex,
    }
  }

  if (queue.words.length === 0) {
    return {
      ...queue,
      index: 0,
    }
  }

  const lastWord = queue.words[queue.words.length - 1]
  const nextWords = shuffle(queue.words)

  if (nextWords.length > 1 && lastWord.id === nextWords[0].id) {
    const lastIndex = nextWords.length - 1
    ;[nextWords[0], nextWords[lastIndex]] = [nextWords[lastIndex], nextWords[0]]
  }

  return {
    words: nextWords,
    index: 0,
  }
}
