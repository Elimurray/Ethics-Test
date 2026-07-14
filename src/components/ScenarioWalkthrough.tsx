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

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{
        flex: '1 1 400px',
        fontSize: 15, lineHeight: 2,
        color: activeToken ? 'var(--text-muted)' : 'var(--text-primary)',
        background: 'var(--surface-1)', borderRadius: 12,
        padding: '1rem 1.25rem',
        transition: 'color .25s',
      }}>
        {facts.map((seg, idx) => {
          if (!seg.tokenId) return <span key={idx}>{seg.text}</span>;
          const active = seg.tokenId === activeToken;
          return (
            <span key={idx} className="tok" style={{
              background: active ? role.bg : 'transparent',
              color: active ? role.tx : 'inherit',
              boxShadow: active ? '0 0 0 1px currentColor' : 'none',
            }}>{seg.text}</span>
          );
        })}
      </div>

      <div style={{ flex: '1 1 340px', position: 'sticky', top: '1rem' }}>
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
      </div>
    </div>
  );
}
