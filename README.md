# KaeruType

A Japanese word typing game. See a kana or kanji word, type it in romaji.

> 🚧 KaeruType is currently in early development.

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
| `pnpm lint`         | Lint the repo with ESLint               |
| `pnpm format`       | Format all files with Prettier          |
| `pnpm format:check` | Check formatting without changing files |

## Project structure

```
apps/web     Vite + React + TypeScript frontend
packages/    Shared packages (empty for now)
```
