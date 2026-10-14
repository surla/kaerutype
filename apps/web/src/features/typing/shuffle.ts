export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const shuffledArray = [...items]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))

    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
