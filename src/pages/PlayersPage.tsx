import { useState } from 'react';
import { mockPlayers } from '../mock/players';
import { useIsMobile } from '../hooks/useIsMobile';
import type { Player, HeatmapZone } from '../types';

type SortKey = 'goals' | 'assists' | 'xG' | 'minutesPlayed' | 'keyPasses';

export default function PlayersPage() {
  const [sort, setSort] = useState<SortKey>('goals');
  const [selected, setSelected] = useState<Player | null>(null);
  const isMobile = useIsMobile();

  const sorted = [...mockPlayers].sort((a, b) => {
    const av = sort === 'xG' ? a.statistics.xG : (a.statistics as any)[sort];
    const bv = sort === 'xG' ? b.statistics.xG : (b.statistics as any)[sort];
    return bv - av;
  });

  return (
    <div style={{ paddingTop: 64, maxWidth: 1100, margin: '0 auto', padding: isMobile ? '72px 16px 60px' : '80px 24px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 48, color: 'var(--white)', marginBottom: 8 }}>
        PLAYER STATS
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: 13 }}>
        Projected tournament stats · Click any player to view their pitch heatmap
      </p>

      {/* Projected stats notice */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 28,
        background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.25)',
        borderRadius: 12, padding: '13px 16px',
      }}>
        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>📊</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>
            Projected Stats
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            These are projected tournament stats based on current form. Live stats will update automatically once the 2026 World Cup begins on <span style={{ color: 'var(--text)' }}>June 11, 2026</span>.
          </div>
        </div>
      </div>

      {/* Sort tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {(['goals','assists','xG','keyPasses','minutesPlayed'] as SortKey[]).map(k => (
          <button key={k} onClick={() => setSort(k)} style={{
            background: sort === k ? 'rgba(245,200,66,0.15)' : 'var(--bg-card)',
            border: sort === k ? '1px solid rgba(245,200,66,0.4)' : '1px solid var(--border)',
            color: sort === k ? 'var(--gold)' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '7px 14px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
          }}>
            {k === 'xG' ? 'xG' : k === 'keyPasses' ? 'Key Passes' : k === 'minutesPlayed' ? 'Minutes' : k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selected && !isMobile ? '1fr 380px' : '1fr',
        gap: 24, alignItems: 'start',
      }}>
        {/* Player list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map((p, i) => {
            const isSelected = selected?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelected(isSelected ? null : p)}
                style={{
                  display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16,
                  background: isSelected ? 'rgba(245,200,66,0.06)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid rgba(245,200,66,0.35)' : '1px solid var(--border)',
                  borderRadius: 12, padding: isMobile ? '12px 14px' : '14px 20px', cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderLeft: i === 0 ? '3px solid var(--gold)' : undefined,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: isMobile ? 16 : 22, minWidth: isMobile ? 20 : 28,
                  color: i === 0 ? 'var(--gold)' : 'var(--text-muted)',
                }}>{i + 1}</span>
                <span style={{ fontSize: isMobile ? 20 : 24 }}>{p.team.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: isMobile ? 13 : 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.position} · {isMobile ? p.team.name : `${p.club} · ${p.team.name}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: isMobile ? 10 : 20, flexShrink: 0 }}>
                  <MiniStat label="G" value={p.statistics.goals} gold />
                  <MiniStat label="A" value={p.statistics.assists} />
                  {!isMobile && <MiniStat label="xG" value={p.statistics.xG.toFixed(1)} />}
                  {!isMobile && <MiniStat label="MIN" value={p.statistics.minutesPlayed} />}
                </div>
                {!isMobile && <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>🗺️ Heatmap</span>}
              </div>
            );
          })}
        </div>

        {/* Heatmap panel */}
        {selected && (
          <div style={{
            background: 'var(--bg-card)', border: '1px solid rgba(245,200,66,0.2)',
            borderRadius: 16, padding: isMobile ? 16 : 24,
            position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : 80,
            marginTop: isMobile ? 8 : 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 18 : 22, color: 'var(--white)' }}>
                  {selected.team.flag} {selected.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.position} · {selected.club}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)',
                width: 30, height: 30, borderRadius: 6, cursor: 'pointer', fontSize: 16,
              }}>×</button>
            </div>

            <Heatmap zones={selected.heatmap} isMobile={isMobile} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
              {[
                { label: 'Goals', value: selected.statistics.goals },
                { label: 'Assists', value: selected.statistics.assists },
                { label: 'xG', value: selected.statistics.xG.toFixed(2) },
                { label: 'xA', value: selected.statistics.xA.toFixed(2) },
                { label: 'Shots', value: selected.statistics.shots },
                { label: 'Key Passes', value: selected.statistics.keyPasses },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--bg-card2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ label, value, gold }: { label: string; value: any; gold?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: gold ? 'var(--gold)' : 'var(--white)' }}>{value}</div>
      <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function Heatmap({ zones, isMobile }: { zones: HeatmapZone[]; isMobile?: boolean }) {
  const W = isMobile ? 280 : 320;
  const H = isMobile ? 185 : 210;
  return (
    <div style={{ position: 'relative', width: W, height: H, margin: '0 auto', borderRadius: 8, overflow: 'hidden' }}>
      {/* Pitch */}
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {/* Field */}
        <rect width={W} height={H} fill="#1a4a2e" />
        {/* Outline */}
        <rect x={8} y={8} width={W-16} height={H-16} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />
        {/* Halfway line */}
        <line x1={W/2} y1={8} x2={W/2} y2={H-8} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
        {/* Center circle */}
        <circle cx={W/2} cy={H/2} r={30} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
        <circle cx={W/2} cy={H/2} r={2} fill="rgba(255,255,255,0.5)" />
        {/* Left penalty box */}
        <rect x={8} y={H/2-35} width={52} height={70} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
        {/* Right penalty box */}
        <rect x={W-60} y={H/2-35} width={52} height={70} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
        {/* Left goal */}
        <rect x={8} y={H/2-15} width={12} height={30} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
        {/* Right goal */}
        <rect x={W-20} y={H/2-15} width={12} height={30} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1} />

        {/* Heatmap blobs */}
        {zones.map((z, i) => {
          const cx = (z.x / 100) * W;
          const cy = (z.y / 100) * H;
          const r = 38 * z.intensity + 12;
          const alpha = z.intensity * 0.55;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill={`rgba(245,80,20,${alpha})`} />
              <circle cx={cx} cy={cy} r={r * 0.5} fill={`rgba(245,200,66,${alpha * 0.8})`} />
            </g>
          );
        })}

        {/* Attack direction arrow */}
        <text x={W - 14} y={H/2 + 4} fontSize={12} fill="rgba(255,255,255,0.3)" textAnchor="middle">▶</text>
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 8, left: 12,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 40, height: 6, borderRadius: 3, background: 'linear-gradient(90deg, rgba(245,80,20,0.1), rgba(245,200,66,0.8))' }} />
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>LOW → HIGH</span>
      </div>
    </div>
  );
}
