# Ethics scenario walkthroughs

Interactive, step-through walkthroughs of engineering-ethics scenarios based on the
Engineering New Zealand Code of Ethical Conduct. Each scenario shows the fact pattern,
highlights one trigger phrase at a time, maps it to a Code rule, then assembles the three
exam answers (main issues / rules that apply / course of action).

Built with React 18 + TypeScript + Vite. Fully self-contained — no UI libraries, no CSS
frameworks, no CDN calls. Dark mode follows `prefers-color-scheme` automatically.

## Scenarios

- Alex — the under-designed beam
- Leo — the SoftStruc analysis
- Jane — partner at a subcontractor
- Dave — designing and assessing
- Taylor — the hospitality gradient

## Getting started

```sh
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```

## Using the walkthrough

- **Next / Prev** (or the left/right arrow keys) step through the annotations.
- **Play** auto-advances every few seconds.
- The dots jump directly to any step; the last three steps are the assembled answers.

## Adding a scenario

Scenarios are data, not components — one reusable `ScenarioWalkthrough` renders any of them.

1. Create `src/scenarios/<id>.ts` exporting a `Scenario` object (see
   `src/scenarios/alex-beam.ts` for the reference shape).
2. Split the fact text into `facts` segments; give each phrase you want to highlight a
   unique `tokenId`. Every `AnnotationStep.tokenId` must match one of those.
3. Order the `steps`: annotations first (in reading order of the facts), then the answer
   steps last.
4. Import it in `src/scenarios/index.ts` and add it to the `scenarios` array.

No component changes needed — the picker and walkthrough are fully generic.

## Deploying

Deploys to Vercel with the standard Vite preset: build command `npm run build`, output
directory `dist`, install command `npm install`. No env vars or serverless functions.
