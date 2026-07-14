import { useState } from 'react';
import { scenarios } from './scenarios';
import { ScenarioWalkthrough } from './components/ScenarioWalkthrough';

export default function App() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
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
