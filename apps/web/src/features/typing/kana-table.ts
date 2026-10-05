import type { KanaTable } from './types'

export const kanaTable: KanaTable = {
  // Vowels
  あ: ['a'],
  い: ['i'],
  う: ['u'],
  え: ['e'],
  お: ['o'],

  // Basic kana
  か: ['ka'],
  き: ['ki'],
  く: ['ku'],
  け: ['ke'],
  こ: ['ko'],

  さ: ['sa'],
  し: ['shi', 'si'],
  す: ['su'],
  せ: ['se'],
  そ: ['so'],

  た: ['ta'],
  ち: ['chi', 'ti'],
  つ: ['tsu', 'tu'],
  て: ['te'],
  と: ['to'],

  な: ['na'],
  に: ['ni'],
  ぬ: ['nu'],
  ね: ['ne'],
  の: ['no'],

  は: ['ha'],
  ひ: ['hi'],
  ふ: ['fu', 'hu'],
  へ: ['he'],
  ほ: ['ho'],

  ま: ['ma'],
  み: ['mi'],
  む: ['mu'],
  め: ['me'],
  も: ['mo'],

  や: ['ya'],
  ゆ: ['yu'],
  よ: ['yo'],

  ら: ['ra'],
  り: ['ri'],
  る: ['ru'],
  れ: ['re'],
  ろ: ['ro'],

  わ: ['wa'],
  を: ['wo'],

  // Moraic nasal
  // Contextual ん input is resolved by the tokenizer.
  ん: ['n', 'nn'],

  // Voiced and semi-voiced kana
  が: ['ga'],
  ぎ: ['gi'],
  ぐ: ['gu'],
  げ: ['ge'],
  ご: ['go'],

  ざ: ['za'],
  じ: ['ji', 'zi'],
  ず: ['zu'],
  ぜ: ['ze'],
  ぞ: ['zo'],

  だ: ['da'],

  // ぢ and づ use distinct IME inputs.
  ぢ: ['di'],
  づ: ['du'],

  で: ['de'],
  ど: ['do'],

  ば: ['ba'],
  び: ['bi'],
  ぶ: ['bu'],
  べ: ['be'],
  ぼ: ['bo'],

  ぱ: ['pa'],
  ぴ: ['pi'],
  ぷ: ['pu'],
  ぺ: ['pe'],
  ぽ: ['po'],

  // Yōon combinations
  きゃ: ['kya'],
  きゅ: ['kyu'],
  きょ: ['kyo'],

  しゃ: ['sha', 'sya', 'shya'],
  しゅ: ['shu', 'syu', 'shyu'],
  しょ: ['sho', 'syo', 'shyo'],

  ちゃ: ['cha', 'tya', 'cya'],
  ちゅ: ['chu', 'tyu', 'cyu'],
  ちょ: ['cho', 'tyo', 'cyo'],

  にゃ: ['nya'],
  にゅ: ['nyu'],
  にょ: ['nyo'],

  ひゃ: ['hya'],
  ひゅ: ['hyu'],
  ひょ: ['hyo'],

  みゃ: ['mya'],
  みゅ: ['myu'],
  みょ: ['myo'],

  りゃ: ['rya'],
  りゅ: ['ryu'],
  りょ: ['ryo'],

  ぎゃ: ['gya'],
  ぎゅ: ['gyu'],
  ぎょ: ['gyo'],

  じゃ: ['ja', 'jya', 'zya'],
  じゅ: ['ju', 'jyu', 'zyu'],
  じょ: ['jo', 'jyo', 'zyo'],

  ぢゃ: ['dya'],
  ぢゅ: ['dyu'],
  ぢょ: ['dyo'],

  びゃ: ['bya'],
  びゅ: ['byu'],
  びょ: ['byo'],

  ぴゃ: ['pya'],
  ぴゅ: ['pyu'],
  ぴょ: ['pyo'],

  // Standalone small kana
  ぁ: ['xa', 'la'],
  ぃ: ['xi', 'li'],
  ぅ: ['xu', 'lu'],
  ぇ: ['xe', 'le'],
  ぉ: ['xo', 'lo'],

  ゃ: ['xya', 'lya'],
  ゅ: ['xyu', 'lyu'],
  ょ: ['xyo', 'lyo'],
  ゎ: ['xwa', 'lwa'],

  // Small tsu
  // Geminated consonant forms are generated contextually by the tokenizer.
  っ: ['xtu', 'ltu', 'xtsu', 'ltsu'],

  // Extended kana combinations
  いぇ: ['ye'],

  うぁ: ['wha'],
  うぃ: ['wi', 'whi'],
  うぇ: ['we', 'whe'],
  うぉ: ['who'],

  くぁ: ['kwa'],
  くぃ: ['kwi'],
  くぇ: ['kwe'],
  くぉ: ['kwo'],

  ぐぁ: ['gwa'],
  ぐぃ: ['gwi'],
  ぐぇ: ['gwe'],
  ぐぉ: ['gwo'],

  しぇ: ['she', 'sye'],
  じぇ: ['je', 'zye'],
  ちぇ: ['che', 'tye', 'cye'],

  つぁ: ['tsa'],
  つぃ: ['tsi'],
  つぇ: ['tse'],
  つぉ: ['tso'],

  てゃ: ['tha'],
  てぃ: ['thi'],
  てゅ: ['thu'],
  てぇ: ['the'],
  てょ: ['tho'],

  でゃ: ['dha'],
  でぃ: ['dhi'],
  でゅ: ['dhu'],
  でぇ: ['dhe'],
  でょ: ['dho'],

  とぁ: ['twa'],
  とぃ: ['twi'],
  とぅ: ['twu'],
  とぇ: ['twe'],
  とぉ: ['two'],

  どぁ: ['dwa'],
  どぃ: ['dwi'],
  どぅ: ['dwu'],
  どぇ: ['dwe'],
  どぉ: ['dwo'],

  ふぁ: ['fa'],
  ふぃ: ['fi'],
  ふぇ: ['fe'],
  ふぉ: ['fo'],
  ふゃ: ['fya'],
  ふゅ: ['fyu'],
  ふょ: ['fyo'],

  // V-sound combinations
  ゔ: ['vu'],
  ゔぁ: ['va'],
  ゔぃ: ['vi'],
  ゔぇ: ['ve'],
  ゔぉ: ['vo'],

  // Long vowel mark
  ー: ['-'],
}
