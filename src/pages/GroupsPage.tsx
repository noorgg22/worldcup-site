import { mockStandings } from '../mock/standings';
import type { StandingsRow } from '../types';
import PageFooter from '../components/PageFooter';

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export default function GroupsPage({ onCountryClick }: { onCountryClick?: (name: string) => void }) {
  const byGroup = (g: string) => mockStandings.filter(r => r.team.group === g);

  return (
    <div style={{ paddingTop: 64, maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
          background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 100, padding: '5px 14px',
        }}>
          <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            48 Teams · 12 Groups
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: 'var(--white)', marginBottom: 8 }}>
          GROUP STAGE
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Top 2 from each group + 8 best 3rd-place teams advance to Round of 32 · Stats update live during the tournament
        </p>
      </div>

      {/* Groups grid — 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {GROUPS.map(g => (
          <GroupTable key={g} group={g} rows={byGroup(g)} onCountryClick={onCountryClick} />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
        {[
          { color: 'var(--gold)', label: '1st Place — Advance' },
          { color: '#4fc3f7',     label: '2nd Place — Advance' },
          { color: 'var(--text-muted)', label: 'Pending / Eliminated' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 3, height: 16, background: l.color, borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{l.label}</span>
          </div>
        ))}
      </div>
      <PageFooter />
    </div>
  );
}

function GroupTable({ group, rows, onCountryClick }: { group: string; rows: StandingsRow[]; onCountryClick?: (name: string) => void }) {
  const sorted = [...rows].sort((a, b) => b.points - a.points || b.goalDiff - a.goalDiff);

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 14, overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,200,66,0.2)'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'}
    >
      {/* Group Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'linear-gradient(90deg, rgba(245,200,66,0.1), transparent)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold)', letterSpacing: '0.05em' }}>
          GROUP {group}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {rows[0]?.team.group === group ? '4 teams' : ''}
        </span>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 28px 28px 28px 28px 32px',
        padding: '7px 16px', gap: 2,
        fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span>Team</span>
        <span style={{ textAlign: 'center' }}>P</span>
        <span style={{ textAlign: 'center' }}>W</span>
        <span style={{ textAlign: 'center' }}>GD</span>
        <span style={{ textAlign: 'center' }}>GF</span>
        <span style={{ textAlign: 'center' }}>PTS</span>
      </div>

      {sorted.map((row, i) => (
        <StandingsRowEl key={row.team.id} row={row} position={i + 1} onCountryClick={onCountryClick} />
      ))}
    </div>
  );
}

function StandingsRowEl({ row, position, onCountryClick }: { row: StandingsRow; position: number; onCountryClick?: (name: string) => void }) {
  const qualColor = position === 1 ? 'var(--gold)' : position === 2 ? '#4fc3f7' : 'transparent';
  const dimmed = row.qualified === 'eliminated';

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 28px 28px 28px 28px 32px',
      padding: '11px 16px', gap: 2, alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderLeft: `3px solid ${qualColor}`,
      opacity: dimmed ? 0.45 : 1,
      transition: 'background 0.15s',
      cursor: onCountryClick ? 'pointer' : 'default',
    }}
      onClick={() => onCountryClick?.(row.team.name)}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>{row.team.flag}</span>
        <span style={{
          fontWeight: 600, fontSize: 13, color: 'var(--white)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {row.team.shortName}
        </span>
      </div>
      <Cell v={row.played} />
      <Cell v={row.won} />
      <Cell
        v={row.goalDiff === 0 ? '0' : row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
        color={row.goalDiff > 0 ? '#66bb6a' : row.goalDiff < 0 ? 'var(--red)' : undefined}
      />
      <Cell v={row.goalsFor} />
      <Cell v={row.points} bold gold={position <= 2} />
    </div>
  );
}

function Cell({ v, color, bold, gold }: { v: any; color?: string; bold?: boolean; gold?: boolean }) {
  return (
    <span style={{
      textAlign: 'center', fontSize: 13,
      color: gold ? 'var(--gold)' : color || 'var(--text)',
      fontWeight: bold ? 700 : 400,
    }}>
      {v}
    </span>
  );
}
