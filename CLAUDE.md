# CLAUDE.md — Ethics Scenario Walkthroughs

## What this is

A small React + TypeScript + Vite single-page app that renders interactive, step-through
"walkthrough" animations of engineering-ethics scenarios (ENZ Code of Ethical Conduct).
Each scenario shows the fact pattern, highlights one trigger phrase at a time, maps it to a
Code rule, then assembles the three exam answers (main issues / rules / course of action).

The app is fully self-contained — no external CSS frameworks, no host-provided design tokens,
no CDN calls. It must build clean and deploy to Vercel with zero config beyond the Vite preset.

## Stack + conventions

- React 18 + TypeScript, built with Vite (`react-ts` template).
- No UI libraries. No Tailwind. Plain CSS custom properties in `src/theme.css`.
- Icons are inline SVG (`src/components/Icon.tsx`) — do not add an icon package.
- Dark mode via `prefers-color-scheme` only. Every colour comes from a CSS variable so both
  modes work automatically. Never hardcode a hex in a component.
- Two font weights only: 400 and 500. Sentence case everywhere. No emoji.
- Scenarios are DATA, not components. One reusable `ScenarioWalkthrough` renders any scenario.
  Adding a scenario = add a file to `src/scenarios/` and one line to `src/scenarios/index.ts`.
- Keep it accessible: `sr-only` summary per walkthrough, `aria-label` on icon-only buttons,
  disabled prev/next at the ends, left/right arrow-key navigation.

## Build steps for Claude Code

1. Scaffold: `npm create vite@latest . -- --template react-ts` (run inside the repo root; if it
   refuses on a non-empty dir, scaffold in a temp dir and move files in).
2. Create the files exactly as specified below, replacing the template's `App.tsx`, `main.tsx`,
   and `index.css`. Delete `src/assets` and any demo boilerplate.
3. `npm install`, then `npm run dev` and confirm the Alex scenario plays: Next/Prev/Play work,
   the active phrase highlights, dots track position, and the last three steps show the answers.
4. `npm run build` must pass with no TS errors.

## Vercel deploy

- Framework preset: Vite. Build command `npm run build`, output dir `dist`, install `npm install`.
- No env vars, no serverless functions. Either `vercel` from the CLI or connect the GitHub repo.
- Add a `vercel.json` only if SPA routing is added later; not needed for the single-page version.

---

# File specifications

## `src/types.ts`

```ts
export type Role = 'gray' | 'danger' | 'warning' | 'pro' | 'success';

/** A run of the fact text. If tokenId is set, this run is a highlightable phrase. */
export interface FactSegment {
  text: string;
  tokenId?: string;
}

/** A step that highlights one fact phrase and explains the rule it triggers. */
export interface AnnotationStep {
  kind: 'annotation';
  tokenId: string;   // must match a FactSegment.tokenId
  role: Role;        // colour family for the pill + highlight
  tag: string;       // pill label, e.g. "Rule 3 · Step 1"
  title: string;
  body: string;
}

/** A step that shows one of the assembled exam answers as a bullet list. */
export interface AnswerStep {
  kind: 'answer';
  role: Role;        // usually 'success'
  tag: string;       // e.g. "Answer 1"
  title: string;     // e.g. "Main issues"
  items: string[];
}

export type Step = AnnotationStep | AnswerStep;

export interface Scenario {
  id: string;         // slug, e.g. "alex-beam"
  name: string;       // display name, e.g. "Alex — the under-designed beam"
  summary: string;    // one line for the sr-only header + picker subtitle
  facts: FactSegment[];
  steps: Step[];
}
```

## `src/theme.css`

```css
:root {
  --surface-0: #faf9f5;
  --surface-1: #f2f0e9;
  --surface-2: #ffffff;
  --text-primary: #1f1f1d;
  --text-secondary: #5f5e5a;
  --text-muted: #8a8880;
  --border: rgba(0, 0, 0, 0.10);
  --border-strong: rgba(0, 0, 0, 0.18);

  --bg-danger: #fcebeb;  --text-danger: #a32d2d;
  --bg-warning: #faeeda;  --text-warning: #854f0b;
  --bg-pro: #eeedfe;      --text-pro: #3c3489;
  --bg-success: #eaf3de;  --text-success: #3b6d11;

  --radius: 8px;
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface-0: #262624;
    --surface-1: #2f2f2c;
    --surface-2: #363633;
    --text-primary: #ecebe5;
    --text-secondary: #b5b3aa;
    --text-muted: #8a8880;
    --border: rgba(255, 255, 255, 0.12);
    --border-strong: rgba(255, 255, 255, 0.20);

    --bg-danger: #501313;  --text-danger: #f09595;
    --bg-warning: #633806;  --text-warning: #fac775;
    --bg-pro: #26215c;      --text-pro: #afa9ec;
    --bg-success: #173404;  --text-success: #97c459;
  }
}

* { box-sizing: border-box; }

html, body, #root {
  margin: 0;
  background: var(--surface-0);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

button {
  font-family: inherit; font-size: 14px; color: var(--text-primary);
  background: transparent; border: 0.5px solid var(--border-strong);
  border-radius: var(--radius); padding: 7px 12px; cursor: pointer;
  transition: background .15s, transform .05s;
}
button:hover:not(:disabled) { background: var(--surface-1); }
button:active:not(:disabled) { transform: scale(0.98); }
button:disabled { opacity: 0.4; cursor: default; }

.tok { border-radius: 4px; padding: 1px 4px; margin: 0 -1px; transition: background .25s, color .25s; }
```

## `src/components/Icon.tsx`

```tsx
type Name = 'play' | 'pause' | 'left' | 'right';

const paths: Record<Name, JSX.Element> = {
  play:  <path d="M6 4l14 8-14 8V4z" fill="currentColor" stroke="none" />,
  pause: <><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none" /></>,
  left:  <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  right: <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
};

export function Icon({ name, size = 18 }: { name: Name; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
```

## `src/components/ScenarioWalkthrough.tsx`

```tsx
import { useState, useEffect, useCallback } from 'react';
import type { Scenario, Role } from '../types';
import { Icon } from './Icon';

const roleVar: Record<Role, { bg: string; tx: string }> = {
  gray:    { bg: 'var(--surface-1)',  tx: 'var(--text-secondary)' },
  danger:  { bg: 'var(--bg-danger)',  tx: 'var(--text-danger)' },
  warning: { bg: 'var(--bg-warning)', tx: 'var(--text-warning)' },
  pro:     { bg: 'var(--bg-pro)',     tx: 'var(--text-pro)' },
  success: { bg: 'var(--bg-success)', tx: 'var(--text-success)' },
};

export function ScenarioWalkthrough({ scenario }: { scenario: Scenario }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { steps, facts } = scenario;

  // reset when the scenario changes
  useEffect(() => { setI(0); setPlaying(false); }, [scenario.id]);

  const clamp = useCallback((n: number) => Math.max(0, Math.min(steps.length - 1, n)), [steps.length]);
  const go = useCallback((d: number) => { setPlaying(false); setI((n) => clamp(n + d)); }, [clamp]);

  useEffect(() => {
    if (!playing) return;
    if (i >= steps.length - 1) { setPlaying(false); return; }
    const t = setTimeout(() => setI((n) => n + 1), 3400);
    return () => clearTimeout(t);
  }, [playing, i, steps.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const step = steps[i];
  const role = roleVar[step.role];
  const activeToken = step.kind === 'annotation' ? step.tokenId : null;

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <h2 className="sr-only">{scenario.summary}</h2>

      <div style={{
        fontSize: 15, lineHeight: 2, color: 'var(--text-primary)',
        background: 'var(--surface-1)', borderRadius: 12,
        padding: '1rem 1.25rem', marginBottom: '1rem',
      }}>
        {facts.map((seg, idx) => {
          if (!seg.tokenId) return <span key={idx}>{seg.text}</span>;
          const active = seg.tokenId === activeToken;
          return (
            <span key={idx} className="tok" style={{
              background: active ? role.bg : 'transparent',
              color: active ? role.tx : 'var(--text-primary)',
            }}>{seg.text}</span>
          );
        })}
      </div>

      <div style={{
        borderRadius: 12, border: '0.5px solid var(--border)',
        background: 'var(--surface-2)', padding: '1rem 1.25rem', minHeight: 150,
      }}>
        <span style={{
          display: 'inline-block', fontSize: 12, fontWeight: 500,
          padding: '3px 10px', borderRadius: 20,
          background: role.bg, color: role.tx, marginBottom: 10,
        }}>{step.tag}</span>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{step.title}</div>
        {step.kind === 'answer' ? (
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
            {step.items.map((it, k) => <li key={k} style={{ marginBottom: 4 }}>{it}</li>)}
          </ul>
        ) : (
          <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{step.body}</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '1rem', flexWrap: 'wrap' }}>
        <button onClick={() => go(-1)} disabled={i === 0} aria-label="Previous step"><Icon name="left" /></button>
        <button onClick={() => setPlaying((p) => !p)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name={playing ? 'pause' : 'play'} />{playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => go(1)} disabled={i === steps.length - 1} aria-label="Next step"><Icon name="right" /></button>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{i + 1} / {steps.length}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          {steps.map((_, idx) => (
            <span key={idx} onClick={() => { setPlaying(false); setI(idx); }} style={{
              width: 7, height: 7, borderRadius: '50%', cursor: 'pointer',
              background: idx === i ? role.tx : 'var(--border-strong)', transition: 'background .2s',
            }} />
          ))}
        </span>
      </div>
    </div>
  );
}
```

## `src/scenarios/alex-beam.ts` (reference scenario — replicate this shape for others)

```ts
import type { Scenario } from '../types';

export const alexBeam: Scenario = {
  id: 'alex-beam',
  name: 'Alex — the under-designed beam',
  summary:
    'Walkthrough of the Alex beam scenario: fact phrases are highlighted and mapped to ENZ Code rules, then assembled into the three answers.',
  facts: [
    { text: 'Alex is commissioned to do a ' },
    { text: 'forensic investigation for an insurance company', tokenId: 's1' },
    { text: ', examining a fire-damaged beam at a residential complex of five two-storey buildings. The beam itself is undamaged. But Alex notices the ' },
    { text: 'beam is critical in a two-storey residential building', tokenId: 's2' },
    { text: ' and, after running calculations, finds it is ' },
    { text: 'considerably under-designed for the purpose', tokenId: 's3' },
    { text: '. Worse, the building is one of five identical ones and ' },
    { text: 'three of the five have already been completed', tokenId: 's4' },
    { text: '. Alex ' },
    { text: 'submitted the report to the insurance company', tokenId: 's5' },
    { text: ' flagging the defect, but is uneasy about their ' },
    { text: 'obligation to the public beyond only informing the insurance company', tokenId: 's6' },
    { text: '. A senior colleague says the ' },
    { text: 'obligation was fulfilled by notifying the insurance company', tokenId: 's7' },
    { text: '.' },
  ],
  steps: [
    { kind: 'annotation', tokenId: 's1', role: 'gray', tag: "Who's the client?", title: 'Note the engagement',
      body: 'The job is a forensic investigation for the insurer — not the builder, not the council. Hold onto this: it is what makes the Rule 7 confidentiality check bite later.' },
    { kind: 'annotation', tokenId: 's2', role: 'danger', tag: 'Rule 1', title: 'People will live here',
      body: 'A critical structural member in an occupied two-storey dwelling. A foreseeable risk to the health and safety of people, so Rule 1 is engaged.' },
    { kind: 'annotation', tokenId: 's3', role: 'warning', tag: 'Rule 3', title: 'The defect itself',
      body: '"Considerably under-designed" is an engineering matter that could cause significant harm to people. That meets the definition of adverse consequences, so Rule 3.' },
    { kind: 'annotation', tokenId: 's4', role: 'warning', tag: 'Rule 3', title: 'Already replicated',
      body: 'Three identical buildings are finished. The risk is not hypothetical or contained — it is live across the complex, and nothing shows anyone is fixing it.' },
    { kind: 'annotation', tokenId: 's5', role: 'warning', tag: 'Rule 3 · Step 1', title: 'Is it being managed?',
      body: 'Alex told the insurer, but the insurer is not responsible for the other buildings\u2019 safety. Informing your client is not the same as the matter being managed appropriately. Step 1 is not satisfied, so Alex cannot stop here.' },
    { kind: 'annotation', tokenId: 's6', role: 'danger', tag: 'Public duty', title: 'The real question',
      body: 'Alex\u2019s instinct is correct: the obligation runs to the public, not only to the paying client. This is the heart of the scenario.' },
    { kind: 'annotation', tokenId: 's7', role: 'pro', tag: 'The trap', title: 'Reject the reassurance',
      body: '"You told the insurer, so you are done" is the trap. A colleague\u2019s comfort does not discharge a public-safety duty. Consulting is good practice; accepting a wrong conclusion is not.' },
    { kind: 'answer', role: 'success', tag: 'Answer 1', title: 'Main issues', items: [
      'A public-safety defect: an under-designed critical beam in occupied dwellings.',
      'Replication — three of five identical buildings already complete.',
      'Does reporting to the insurer discharge Alex\u2019s duty? (No.)',
      'Confidentiality — the findings arose from the insurer engagement.' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 2', title: 'Rules that apply', items: [
      'Rule 1 — safeguard the health and safety of future occupants.',
      'Rule 3 — adverse consequences; walk the three steps. Not being managed, so escalate.',
      'Rule 7 — the findings are the insurer\u2019s; raise with them before disclosing to a regulator.' ] },
    { kind: 'answer', role: 'success', tag: 'Answer 3', title: 'Course of action', items: [
      'Go back to the insurer: state the risk extends to the three completed buildings.',
      'Say you intend to notify the building consent authority unless it is addressed; give them a chance to respond (Rule 7).',
      'If unresolved, report to the territorial / building consent authority (Rule 3, Step 3).',
      'Document every step. Do not accept "you have told the client, you are done."' ] },
  ],
};
```

## `src/scenarios/index.ts`

```ts
import type { Scenario } from '../types';
import { alexBeam } from './alex-beam';

// Add new scenarios here as they are created.
export const scenarios: Scenario[] = [alexBeam];
```

## `src/App.tsx`

```tsx
import { useState } from 'react';
import { scenarios } from './scenarios';
import { ScenarioWalkthrough } from './components/ScenarioWalkthrough';

export default function App() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 4px' }}>Ethics scenario walkthroughs</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
          ENZ Code of Ethical Conduct. Step through the facts, map each phrase to a rule, then read the answers.
        </p>
      </header>

      {scenarios.length > 1 && (
        <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {scenarios.map((s) => {
            const on = s.id === activeId;
            return (
              <button key={s.id} onClick={() => setActiveId(s.id)} style={{
                borderColor: on ? 'var(--text-primary)' : 'var(--border-strong)',
                background: on ? 'var(--surface-1)' : 'transparent',
              }}>{s.name}</button>
            );
          })}
        </nav>
      )}

      <ScenarioWalkthrough scenario={active} />
    </main>
  );
}
```

## `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './theme.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
);
```

## `index.html`

Standard Vite `index.html` with `<div id="root"></div>` and `<title>Ethics scenario walkthroughs</title>`.
Keep the `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` line.

---

# Adding a new scenario

1. Create `src/scenarios/<id>.ts` exporting a `Scenario` object shaped exactly like `alexBeam`.
2. Split the fact text into `facts` segments; give each phrase you want to highlight a unique
   `tokenId`. Every `AnnotationStep.tokenId` must match one of those.
3. Order the `steps`: annotations first (following the reading order of the facts), then the
   answer steps last.
4. Import it in `src/scenarios/index.ts` and push it onto the `scenarios` array.
5. No component changes needed — the picker and walkthrough are fully generic.
