const spellings = [
  { kana: 'し', inputs: 'shi, si' },
  { kana: 'ち', inputs: 'chi, ti' },
  { kana: 'つ', inputs: 'tsu, tu' },
  { kana: 'ふ', inputs: 'fu, hu' },
  { kana: 'じ', inputs: 'ji, zi' },
  { kana: 'づ', inputs: 'du, zu' },
  { kana: 'しゃ', inputs: 'sha, sya' },
  { kana: 'じゃ', inputs: 'ja, jya, zya' },
]

export function HowItWorksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <article className="space-y-10">
        <header className="space-y-3">
          <a href="/" className="text-sm text-gray-500 transition-colors hover:text-green-700">
            ← Back to KaeruType
          </a>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h1>

          <p className="text-lg text-gray-500">Practice Japanese. Type with purpose.</p>

          <p className="leading-relaxed text-gray-600">
            KaeruType is a Japanese typing game designed to help you become more comfortable reading
            and typing Japanese.
          </p>
          <p className="leading-relaxed text-gray-600">
            Type each word using romaji, and build your speed and accuracy one round at a time. No
            complicated setup. Just open KaeruType and start typing.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">01. Start typing</h2>
          <p className="leading-relaxed text-gray-600">
            Japanese words appear on the screen, one at a time.
          </p>
          <p className="leading-relaxed text-gray-600">
            Type the pronunciation using your regular keyboard. As you complete each word, the next
            one appears.
          </p>
          <p className="leading-relaxed text-gray-600">
            Each round lasts 30 seconds, and the timer starts when you press your first key. You
            don't need a Japanese keyboard. Just use the keyboard you already have.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">02. Typing rules</h2>
          <p className="leading-relaxed text-gray-600">
            KaeruType accepts romaji the way a Japanese keyboard does, so you can type the spelling
            you're used to. A partly typed spelling is never marked wrong while it can still lead to
            a valid one.
          </p>

          <h3 className="pt-2 font-semibold text-gray-900">Common alternatives</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-600">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="py-2 pr-6 font-medium">Kana</th>
                  <th className="py-2 font-medium">You can type</th>
                </tr>
              </thead>
              <tbody>
                {spellings.map((row) => (
                  <tr key={row.kana} className="border-b border-gray-100">
                    <td className="py-2 pr-6 text-lg text-gray-900">{row.kana}</td>
                    <td className="py-2">{row.inputs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 font-semibold text-gray-900">Small っ</h3>
          <p className="leading-relaxed text-gray-600">
            Double the next consonant: <strong className="text-gray-900">kitte</strong>,{' '}
            <strong className="text-gray-900">gakkou</strong>,{' '}
            <strong className="text-gray-900">maccha</strong>.
          </p>

          <h3 className="pt-2 font-semibold text-gray-900">ん</h3>
          <p className="leading-relaxed text-gray-600">
            Before most consonants, a single <strong className="text-gray-900">n</strong> is enough
            (かんじ is <strong className="text-gray-900">kanji</strong>). Before a vowel, a y sound,
            another n sound, or at the end of a word, type{' '}
            <strong className="text-gray-900">nn</strong> (こんにちは is{' '}
            <strong className="text-gray-900">konnichiha</strong>).
          </p>

          <h3 className="pt-2 font-semibold text-gray-900">Long vowels</h3>
          <p className="leading-relaxed text-gray-600">
            Type every vowel out, with no macrons:{' '}
            <strong className="text-gray-900">toukyou</strong>,{' '}
            <strong className="text-gray-900">sensei</strong>,{' '}
            <strong className="text-gray-900">ookii</strong>.
          </p>

          <h3 className="pt-2 font-semibold text-gray-900">Mistakes</h3>
          <p className="leading-relaxed text-gray-600">
            A wrong letter stays in the field until you delete it with Backspace, and you can only
            delete within the kana you're on. Kana you've finished are locked in.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">03. See how you did</h2>
          <p className="leading-relaxed text-gray-600">
            Every round gives you a snapshot of your performance. Review your results and see where
            you're improving.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>
              <strong className="text-gray-900">Words per minute:</strong> your typing speed in
              words per minute.
            </li>
            <li>
              <strong className="text-gray-900">Kana per minute:</strong> how many Japanese kana
              characters you type per minute.
            </li>
            <li>
              <strong className="text-gray-900">Accuracy:</strong> how consistently you type without
              mistakes. A wrong key counts against you even if you delete it.
            </li>
            <li>
              <strong className="text-gray-900">Words completed:</strong> how many words you
              finished during the round.
            </li>
          </ul>
          <p className="leading-relaxed text-gray-600">
            Don't worry about being fast right away. Focus on accuracy first. Speed will follow with
            practice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Find your rhythm</h2>
          <p className="leading-relaxed text-gray-600">
            A little practice goes a long way. Come back, challenge your previous results, and keep
            building your Japanese typing skills.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Ready to play?</h2>
          <p className="leading-relaxed text-gray-600">Start a round and see how far you can go.</p>
          <a
            href="/"
            className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
          >
            Start Playing →
          </a>
        </section>

        <footer className="border-t border-gray-200 pt-6">
          <a href="/" className="text-sm text-gray-500 transition-colors hover:text-green-700">
            ← Back to KaeruType
          </a>
        </footer>
      </article>
    </main>
  )
}
