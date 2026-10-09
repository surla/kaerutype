import { kanaTable } from './kana-table'
import type { KanaUnit } from './types'

function splitIntoKana(word: string): string[] {
  const kanaList: string[] = []
  let i = 0

  while (i < word.length) {
    const kanaPair = word.slice(i, i + 2)
    const currentKana = word[i]

    if (kanaPair.length === 2 && kanaTable[kanaPair]) {
      kanaList.push(kanaPair)
      i += 2
    } else if (kanaTable[currentKana]) {
      kanaList.push(currentKana)
      i++
    } else {
      throw new Error(`Unknown kana: ${currentKana}`)
    }
  }

  return kanaList
}

function buildDoubledInputs(nextKana: string): string[] {
  const consonants = 'bcdfghjkmprstvwyz'
  const doubled: string[] = []

  for (const spelling of kanaTable[nextKana]) {
    if (consonants.includes(spelling[0])) {
      doubled.push(spelling[0] + spelling)
    }
  }

  return doubled
}

export function tokenizeKana(word: string): KanaUnit[] {
  const kanaList = splitIntoKana(word)
  const kanaUnits: KanaUnit[] = []

  for (let i = 0; i < kanaList.length; i++) {
    const kana = kanaList[i]
    const nextKana = kanaList[i + 1]

    const doubledInputs = kana === 'っ' && nextKana ? buildDoubledInputs(nextKana) : []

    if (kana === 'ん') {
      const requiresDoubleN =
        !nextKana || kanaTable[nextKana].some((spelling) => 'aiueoy'.includes(spelling[0]))

      kanaUnits.push({ kana, acceptedInputs: requiresDoubleN ? ['nn'] : [...kanaTable[kana]] })
    } else if (doubledInputs.length > 0) {
      kanaUnits.push({ kana: kana + nextKana, acceptedInputs: doubledInputs })
      i++
    } else {
      kanaUnits.push({ kana, acceptedInputs: [...kanaTable[kana]] })
    }
  }

  return kanaUnits
}
