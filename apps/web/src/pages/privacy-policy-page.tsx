export function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <article className="space-y-10">
        <header className="space-y-3">
          <a href="/" className="text-sm text-gray-500 transition-colors hover:text-green-700">
            ← Back to KaeruType
          </a>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="text-sm text-gray-500">Last updated: November 2, 2026</p>

          <p className="leading-relaxed text-gray-600">
            KaeruType respects your privacy. This policy explains what information we collect, how
            we use it, and the choices you have when using our Japanese typing game.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
          <p className="leading-relaxed text-gray-600">
            You can use KaeruType without creating an account or providing personal information.
          </p>
          <p className="leading-relaxed text-gray-600">
            We may collect usage and technical information, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Pages visited and features used.</li>
            <li>Game sessions started and completed.</li>
            <li>Gameplay statistics, such as typing speed and accuracy.</li>
            <li>Browser type, device information, and operating system.</li>
            <li>Approximate geographic information.</li>
            <li>Referring websites and general usage patterns.</li>
          </ul>
          <p className="leading-relaxed text-gray-600">
            If you submit feedback through our feedback form, you may voluntarily provide comments,
            suggestions, or contact information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
          <p className="leading-relaxed text-gray-600">We use collected information to:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Operate and maintain KaeruType.</li>
            <li>Understand how people use the game.</li>
            <li>Improve gameplay, performance, and usability.</li>
            <li>Identify and troubleshoot technical issues.</li>
            <li>Review feedback and respond to inquiries.</li>
            <li>Protect the service against abuse and security threats.</li>
          </ul>
          <p className="leading-relaxed text-gray-600">We do not sell your personal information.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Analytics</h2>
          <p className="leading-relaxed text-gray-600">
            KaeruType uses PostHog to understand how visitors interact with the service. PostHog may
            process usage information, device information, and analytics events to help us
            understand product engagement and improve KaeruType.
          </p>
          <p className="leading-relaxed text-gray-600">
            We do not intend to collect the actual text or keystrokes you enter while playing the
            game through our analytics.
          </p>
          <p className="leading-relaxed text-gray-600">
            For more information, visit{' '}
            <a
              href="https://posthog.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline underline-offset-4 hover:text-green-800"
            >
              PostHog's Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">
            4. Cookies and Similar Technologies
          </h2>
          <p className="leading-relaxed text-gray-600">
            KaeruType and its third-party service providers may use cookies, local storage, or
            similar technologies to support functionality, analytics, and service performance.
          </p>
          <p className="leading-relaxed text-gray-600">
            You can manage or restrict cookies through your browser settings. Disabling certain
            technologies may affect some features of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. Third-Party Services</h2>
          <p className="leading-relaxed text-gray-600">
            KaeruType relies on third-party providers to operate and improve the service. These
            providers may process information according to their respective privacy policies.
          </p>
          <ul className="space-y-3 text-gray-600">
            <li>
              <strong className="text-gray-900">Cloudflare:</strong> Website hosting,
              infrastructure, security, and performance.{' '}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline underline-offset-4"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <strong className="text-gray-900">PostHog:</strong> Product analytics and usage
              insights.{' '}
              <a
                href="https://posthog.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline underline-offset-4"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <strong className="text-gray-900">Tally:</strong> Feedback collection and form
              submissions.{' '}
              <a
                href="https://tally.so/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline underline-offset-4"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Data Retention</h2>
          <p className="leading-relaxed text-gray-600">
            We retain information only for as long as reasonably necessary to fulfill the purposes
            described in this policy, comply with applicable legal obligations, resolve disputes,
            and maintain the security of our service.
          </p>
          <p className="leading-relaxed text-gray-600">
            Retention periods may vary depending on the type of information and the third-party
            service processing it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Your Privacy Rights</h2>
          <p className="leading-relaxed text-gray-600">
            Depending on where you live, you may have certain rights regarding your personal
            information, including the right to:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>Request access to personal information we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion of personal information.</li>
            <li>Opt out of certain types of data processing where applicable.</li>
            <li>Receive information about how your information is collected and used.</li>
          </ul>
          <p className="leading-relaxed text-gray-600">
            To exercise applicable privacy rights, contact us using the information below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Children's Privacy</h2>
          <p className="leading-relaxed text-gray-600">
            KaeruType is not intended to knowingly collect personal information from children under
            the age of 13. If you believe a child has provided us with personal information, please
            contact us so we can take appropriate action.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">9. Changes to This Privacy Policy</h2>
          <p className="leading-relaxed text-gray-600">
            We may update this Privacy Policy from time to time to reflect changes to KaeruType, our
            practices, or applicable legal requirements.
          </p>
          <p className="leading-relaxed text-gray-600">
            When changes are made, we will update the "Last updated" date at the top of this page.
            We encourage you to review this page periodically.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">10. Contact Us</h2>
          <p className="leading-relaxed text-gray-600">
            If you have questions about this Privacy Policy or how your information is handled,
            please contact us:
          </p>
          <a
            href="mailto:hello@kaerutype.com"
            className="inline-block text-green-700 underline underline-offset-4 hover:text-green-800"
          >
            hello@kaerutype.com
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
