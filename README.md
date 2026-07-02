# Interview Practice

A collection of self-contained full-stack coding challenges for practicing technical interviews, built with Next.js.

Each challenge lives at its own route (`/challenge-XXX`) and ships with a brief — context, requirements, constraints, expected outcome, and optional bonus goals — followed by a starter page you replace with your own implementation. The goal is to simulate a take-home or live-coding interview: read the brief, research what you need, and build a working solution without being handed the answer.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the list of available challenges.

## How a challenge works

1. Pick a challenge from the home page (`app/page.tsx`).
2. Open its brief (`app/challenge-XXX/page.tsx`) — expand "Challenge Brief" for context, requirements, constraints, and what will be evaluated.
3. Replace the placeholder solution section in that same file (and add any supporting routes, e.g. `app/api/.../route.ts`) with your implementation.
4. Verify against the brief's "Expected Outcome" checklist before considering it done.

## Adding a new challenge

1. Create a new folder under `app/` (e.g. `app/challenge-002/`) with its own `page.tsx`.
2. Write a brief following the structure used in `app/challenge-001/page.tsx` (Context, Requirements, Constraints, Expected Outcome, optional Bonus).
3. Add an entry to the `challenges` array in `app/page.tsx` so it shows up on the home page.

## Note on this Next.js version

This project pins a Next.js version with breaking changes relative to older docs and training data — APIs, conventions, and file structure may differ from what you expect. Check `node_modules/next/dist/docs/` before relying on prior Next.js knowledge.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
