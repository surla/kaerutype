# KaeruType 🐸

A Japanese typing game. See a Japanese word, type its reading in romaji, and find out how fast and accurate you are.

![Version](https://img.shields.io/badge/version-0.1.0--beta-green)
![Status](https://img.shields.io/badge/status-public%20beta-blue)

[**Play KaeruType**](https://kaerutype.com) · [How It Works](https://kaerutype.com/how-it-works) · [Send Feedback](https://tally.so/r/RWGjOQ)

> 🚧 KaeruType is in beta (v0.1.0). Expect rough edges, and [tell me what to fix](https://tally.so/r/gbDzV1).

## Features

- **Japanese vocabulary practice** — Practice typing Japanese words using romaji input.
- **Timed rounds** — Challenge yourself with focused typing sessions.
- **Romaji input** — Type Japanese words using familiar romaji conventions.
- **Session results** — Review your WPM, kana per minute, accuracy, and completed words after each round.
- **New rounds** — Start a fresh round with a new set of Japanese words after viewing your results.

## Roadmap

- Settings: word display (kanji or kana), romaji hints, and round length
- Personal records and typing history
- Accounts and a global leaderboard

## Tech Stack

| Technology         | Purpose           |
| ------------------ | ----------------- |
| React              | User interface    |
| TypeScript         | Type safety       |
| Vite               | Build tooling     |
| Tailwind CSS       | Styling           |
| Zustand            | State management  |
| Vitest             | Testing           |
| PostHog            | Product analytics |
| Cloudflare Workers | Deployment        |

## Requirements

- [Node.js](https://nodejs.org/) (current LTS or newer)
- [pnpm](https://pnpm.io/) 12.8.1

## Getting started

```bash
pnpm install
pnpm dev
```

Then open the URL that `pnpm dev` prints, usually `http://localhost:5173`.

## Scripts

| Command             | Description                             |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | Start the web app dev server            |
| `pnpm build`        | Type-check and build the web app        |
| `pnpm test`         | Run the tests                           |
| `pnpm typecheck`    | Type-check the web app                  |
| `pnpm lint`         | Lint the repo with ESLint               |
| `pnpm format`       | Format all files with Prettier          |
| `pnpm format:check` | Check formatting without changing files |

## Project structure

```
apps/web     Vite + React + TypeScript frontend
```

Inside `apps/web/src`:

```
features/typing   Typing logic, stores, and screens (the game itself)
components/       Shared layout components
pages/            Static pages (How It Works, Privacy Policy)
lib/              Shared constants and helpers
```

## Feedback

KaeruType is currently in public beta. Feedback helps improve the typing experience and shape future features.

Found a bug or have an idea?

[Share your feeback ->](https://tally.so/r/RWGjOQ)
