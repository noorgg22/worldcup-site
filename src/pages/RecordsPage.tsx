import { useState, useRef } from 'react';
import PageFooter from '../components/PageFooter';
import { createPortal } from 'react-dom';
import {
  INDIVIDUAL_RECORDS,
  TEAM_RECORDS,
  TOURNAMENT_RECORDS,
  ALL_TIME_STANDINGS,
  type IndividualRecord,
  type TeamRecord,
  type TournamentRecord,
  type AllTimeStanding,

} from '../data/records';

type Tab = 'individual' | 'team' | 'tournament' | 'standings';

const TAB_CONFIG: { id: Tab; label: string; icon: string }[] = [
  { id: 'standings',  label: 'All-Time Standings',  icon: '📋' },
  { id: 'team',       label: 'Team Records',       icon: '🏆' },
  { id: 'individual', label: 'Player Records',     icon: '👤' },
  { id: 'tournament', label: 'Tournament Records',  icon: '📊' },
];

export default function RecordsPage({ onCountryClick }: { onCountryClick?: (name: string) => void }) {
  const [tab, setTab] = useState<Tab>('standings');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64 }}>
      {/* Hero Banner */}
      <RecordsHeroBanner />

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 8, padding: '24px 40px 0',
        overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.06)',
        maxWidth: 1200, margin: '0 auto',
      }}>
        {TAB_CONFIG.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? 'rgba(245,200,66,0.12)' : 'transparent',
              border: tab === t.id ? '1px solid rgba(245,200,66,0.3)' : '1px solid rgba(255,255,255,0.08)',
              color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13,
              letterSpacing: '0.05em', padding: '9px 20px', borderRadius: '8px 8px 0 0',
              cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              borderBottom: tab === t.id ? '1px solid var(--bg)' : undefined,
              marginBottom: -1,
            }}
          >
            <span style={{ marginRight: 6 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 40px 80px' }}>
        {tab === 'individual'  && <IndividualTab />}
        {tab === 'team'        && <TeamTab />}
        {tab === 'tournament'  && <TournamentTab />}
        {tab === 'standings'   && <StandingsTab onCountryClick={onCountryClick} />}
      </div>
      <PageFooter />
    </div>
  );
}

// Direct Wikimedia Commons URLs — verified via imageinfo API
const PELE_IMG     = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Pele_celebrating_1970.jpg/1280px-Pele_celebrating_1970.jpg';
const MARADONA_IMG = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/1280px-Maradona-Mundial_86_con_la_copa.JPG';

/* ─── Records Hero Banner ─── */
function RecordsHeroBanner() {
  return (
    <div style={{ position: 'relative', height: 'clamp(220px, 32vw, 380px)', overflow: 'hidden' }}>
      {/* Split photos */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        {/* Left — Pelé */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img
            src={PELE_IMG}
            alt="Pelé celebrating 1970 World Cup"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 30%',
              filter: 'saturate(1.2) brightness(0.5)',
            }}
          />
          <div style={{
            position: 'absolute', bottom: 20, left: 24,
            fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.88)',
            fontSize: 'clamp(12px, 1.8vw, 18px)', letterSpacing: '0.16em',
            textShadow: '0 2px 14px rgba(0,0,0,0.9)',
          }}>
            PELÉ · 1958 · 1962 · 1970
          </div>
        </div>

        {/* Gold centre divider */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: '50%', width: 3,
          transform: 'translateX(-50%)',
          zIndex: 4,
          background: 'linear-gradient(180deg, transparent 0%, rgba(245,200,66,0.9) 20%, rgba(245,200,66,0.9) 80%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Right — Maradona */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img
            src={MARADONA_IMG}
            alt="Maradona lifting the 1986 World Cup trophy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 20%',
              filter: 'saturate(1.3) brightness(0.5)',
            }}
          />
          <div style={{
            position: 'absolute', bottom: 20, right: 24,
            fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.88)',
            fontSize: 'clamp(12px, 1.8vw, 18px)', letterSpacing: '0.16em',
            textShadow: '0 2px 14px rgba(0,0,0,0.9)',
            textAlign: 'right',
          }}>
            MARADONA · 1986
          </div>
        </div>
      </div>

      {/* Vignette — top + bottom */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(180deg, rgba(6,9,15,0.6) 0%, rgba(6,9,15,0.05) 30%, rgba(6,9,15,0.05) 65%, rgba(6,9,15,0.8) 100%)',
      }} />

      {/* Centre text */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5.5vw, 64px)',
          letterSpacing: '0.14em', color: '#fff',
          margin: '0 0 10px',
          textShadow: '0 2px 28px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.4)',
        }}>
          ALL-TIME RECORDS
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 1, background: 'rgba(245,200,66,0.7)' }} />
          <p style={{
            color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(10px,1.3vw,13px)',
            margin: 0, letterSpacing: '0.1em', fontWeight: 600,
            textShadow: '0 1px 10px rgba(0,0,0,0.9)',
          }}>
            92 YEARS OF WORLD CUP HISTORY · 22 TOURNAMENTS · VERIFIED STATISTICS
          </p>
          <div style={{ width: 40, height: 1, background: 'rgba(245,200,66,0.7)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Individual Records ─── */
function IndividualTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <SectionHeader
        title="Individual Records"
        subtitle="Personal bests etched into World Cup history — click any record to see the full rankings"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {INDIVIDUAL_RECORDS.map((r) => (
          <IndividualCard
            key={r.category}
            record={r}
            open={expanded === r.category}
            onToggle={() => setExpanded(expanded === r.category ? null : r.category)}
          />
        ))}
      </div>
    </div>
  );
}

function IndividualCard({ record, open, onToggle }: {
  record: IndividualRecord; open: boolean; onToggle: () => void;
}) {
  // Max value for bar chart (extract number from value string)
  const maxVal = record.leaderboard?.[0]
    ? parseFloat(record.leaderboard[0].value.replace(/[^\d.]/g, '')) || 0
    : 0;

  return (
    <div
      style={{
        background: open ? 'rgba(13,18,28,0.98)' : 'var(--bg-card)',
        border: `1px solid ${open ? 'rgba(245,200,66,0.35)' : 'var(--border)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s, background 0.2s',
        boxShadow: open ? '0 0 40px rgba(245,200,66,0.06)' : 'none',
      }}
    >
      {/* ── Header row ── */}
      <div
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: 0,
          cursor: 'pointer',
          position: 'relative', overflow: 'hidden',
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
      >
        {/* Gold left bar */}
        <div style={{
          width: 4, alignSelf: 'stretch', flexShrink: 0,
          background: open
            ? 'linear-gradient(180deg, #f5c842, #c9a224)'
            : 'linear-gradient(180deg, rgba(245,200,66,0.18), rgba(245,200,66,0.04))',
          transition: 'background 0.2s',
        }} />

        {/* Flag */}
        <span style={{ fontSize: 28, flexShrink: 0, paddingRight: 14 }}>{record.flag}</span>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, padding: '18px 0' }}>
          <div style={{
            color: 'var(--text-muted)', fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', fontWeight: 700, marginBottom: 5,
          }}>
            {record.category}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{record.holder}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>· {record.country}</span>
          </div>
        </div>

        {/* Value */}
        <div style={{ textAlign: 'right', flexShrink: 0, padding: '18px 20px 18px 16px' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)',
            letterSpacing: '0.06em', lineHeight: 1,
          }}>
            {record.value}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 4 }}>{record.year}</div>
        </div>

        {/* Chevron */}
        <div style={{
          padding: '0 20px 0 0', flexShrink: 0,
          color: open ? 'var(--gold)' : 'var(--text-muted)',
          fontSize: 13,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.25s, color 0.2s',
        }}>
          ▼
        </div>
      </div>

      {/* ── Expanded leaderboard ── */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Detail text */}
          <div style={{ padding: '14px 24px 0 24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              {record.detail}
            </p>
          </div>

          {/* Leaderboard table */}
          {record.leaderboard && record.leaderboard.length > 0 && (
            <div style={{ padding: '16px 24px 20px' }}>
              {/* Column headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '36px 24px 1fr 1fr 100px 100px',
                gap: 8, padding: '6px 12px',
                fontSize: 9, color: 'var(--text-dim)', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                marginBottom: 4,
              }}>
                <span style={{ textAlign: 'center' }}>#</span>
                <span />
                <span>Player</span>
                <span>Country</span>
                <span style={{ textAlign: 'right' }}>Record</span>
                <span style={{ textAlign: 'right' }}>Year</span>
              </div>

              {/* Rows */}
              {record.leaderboard.map((entry, i) => {
                const entryVal = parseFloat(entry.value.replace(/[^\d.]/g, '')) || 0;
                const barPct = maxVal > 0 ? (entryVal / maxVal) * 100 : 0;
                const isTop3 = entry.rank <= 3;
                const rankColor = entry.rank === 1 ? '#f5c842' : entry.rank === 2 ? '#b0bec5' : entry.rank === 3 ? '#cd7f32' : 'var(--text-muted)';

                return (
                  <div
                    key={`${entry.name}-${i}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '36px 24px 1fr 1fr 100px 100px',
                      gap: 8, padding: '9px 12px',
                      borderRadius: 8,
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.018)' : 'transparent',
                      alignItems: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Bar background */}
                    {barPct > 0 && (
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${barPct}%`,
                        background: entry.rank === 1
                          ? 'rgba(245,200,66,0.06)'
                          : 'rgba(255,255,255,0.02)',
                        borderRadius: 8,
                        pointerEvents: 'none',
                      }} />
                    )}

                    {/* Rank */}
                    <div style={{
                      textAlign: 'center', fontFamily: 'var(--font-display)',
                      fontSize: 15, color: rankColor, lineHeight: 1,
                      fontWeight: 700, position: 'relative',
                    }}>
                      {entry.rank}
                    </div>

                    {/* Flag */}
                    <span style={{ fontSize: 16, position: 'relative' }}>{entry.flag}</span>

                    {/* Name */}
                    <div style={{
                      color: isTop3 ? '#fff' : 'var(--text)',
                      fontWeight: isTop3 ? 700 : 500,
                      fontSize: 13, position: 'relative',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {entry.name}
                      {entry.rank === 1 && (
                        <span style={{
                          marginLeft: 6, fontSize: 9, color: 'var(--gold)',
                          fontWeight: 700, letterSpacing: '0.1em',
                          verticalAlign: 'middle',
                        }}>
                          ★ RECORD
                        </span>
                      )}
                    </div>

                    {/* Country */}
                    <div style={{
                      color: 'var(--text-muted)', fontSize: 12,
                      position: 'relative',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {entry.country}
                    </div>

                    {/* Value */}
                    <div style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-display)',
                      fontSize: 14,
                      color: entry.rank === 1 ? 'var(--gold)' : isTop3 ? '#ddd' : 'var(--text-muted)',
                      letterSpacing: '0.04em',
                      position: 'relative',
                    }}>
                      {entry.value}
                    </div>

                    {/* Year */}
                    <div style={{
                      textAlign: 'right', fontSize: 11,
                      color: 'var(--text-muted)', position: 'relative',
                    }}>
                      {entry.year}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Team Records ─── */
function TeamTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SectionHeader
        title="Team Records"
        subtitle="The greatest collective achievements across 92 years"
      />
      {TEAM_RECORDS.map(r => (
        <TeamCard
          key={r.category}
          record={r}
          open={expanded === r.category}
          onToggle={() => setExpanded(expanded === r.category ? null : r.category)}
        />
      ))}
    </div>
  );
}

function TeamCard({ record, open, onToggle }: {
  record: TeamRecord; open: boolean; onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: 'var(--bg-card)', border: `1px solid ${open ? 'rgba(245,200,66,0.3)' : 'var(--border)'}`,
        borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px' }}>
        <span style={{ fontSize: 36, flexShrink: 0 }}>{record.flag}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.08em',
            textTransform: 'uppercase', fontWeight: 600, marginBottom: 4,
          }}>
            {record.category}
          </div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{record.holder}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)',
            letterSpacing: '0.06em',
          }}>
            {record.value}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{record.year}</div>
        </div>
        <span style={{
          color: 'var(--text-muted)', fontSize: 16, flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s',
        }}>▾</span>
      </div>
      {open && (
        <div style={{
          padding: '16px 24px 20px', borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {record.detail}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Tournament Records ─── */
function TournamentTab() {
  return (
    <div>
      <SectionHeader
        title="Tournament Records"
        subtitle="Milestones and firsts across World Cup history"
      />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16,
        marginTop: 24,
      }}>
        {TOURNAMENT_RECORDS.map(r => <TournamentCard key={r.category} record={r} />)}
      </div>
    </div>
  );
}

function TournamentCard({ record }: { record: TournamentRecord }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '20px 22px',
    }}>
      <div style={{
        color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.08em',
        textTransform: 'uppercase', fontWeight: 600, marginBottom: 8,
      }}>
        {record.category}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold)',
        letterSpacing: '0.06em', marginBottom: 6,
      }}>
        {record.value}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 10 }}>{record.year}</div>
      <p style={{ color: '#ccc', fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>{record.detail}</p>
    </div>
  );
}

/* ─── Portal tooltip — renders on document.body, escapes all overflow ─── */
interface TooltipPortalProps {
  anchorRect: DOMRect | null;
  children: React.ReactNode;
}
function TooltipPortal({ anchorRect, children }: TooltipPortalProps) {
  if (!anchorRect) return null;
  const top  = anchorRect.top + window.scrollY - 10;
  const left = anchorRect.left + anchorRect.width / 2;
  return createPortal(
    <div style={{
      position: 'absolute', top, left,
      transform: 'translate(-50%, -100%)',
      background: '#1a2035',
      border: '1px solid rgba(245,200,66,0.4)',
      color: '#fff', fontSize: 12, fontWeight: 500,
      padding: '7px 12px', borderRadius: 7,
      zIndex: 9999, pointerEvents: 'none',
      whiteSpace: 'nowrap',
      boxShadow: '0 6px 24px rgba(0,0,0,0.55)',
    }}>
      {children}
      {/* Down arrow */}
      <div style={{
        position: 'absolute', top: '100%', left: '50%',
        transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid rgba(245,200,66,0.4)',
      }} />
    </div>,
    document.body
  );
}

/* ─── Column header with above-positioned tooltip ─── */
function ColHeader({ label, tip, active, asc: isAsc, onClick }: {
  label: string; tip: string; active: boolean; asc: boolean; onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setRect(ref.current?.getBoundingClientRect() ?? null)}
      onMouseLeave={() => setRect(null)}
      style={{ ...thStyle, cursor: 'pointer', color: active ? 'var(--gold)' : 'var(--text-muted)', userSelect: 'none' }}
    >
      {label}{active ? (isAsc ? ' ↑' : ' ↓') : ''}
      <TooltipPortal anchorRect={rect}>{tip}</TooltipPortal>
    </div>
  );
}

/* ─── Year-list tooltip cell ─── */
function YearCell({
  count, years, gold = false, emptyChar = '—',
}: {
  count: number; years?: number[]; gold?: boolean; emptyChar?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const hasYears = years && years.length > 0 && count > 0;

  return (
    <div
      ref={ref}
      onMouseEnter={() => hasYears ? setRect(ref.current?.getBoundingClientRect() ?? null) : undefined}
      onMouseLeave={() => setRect(null)}
      style={{
        ...tdStyle,
        color: gold ? 'var(--gold)' : count > 0 ? '#ddd' : 'var(--text-muted)',
        fontWeight: gold ? 800 : count > 0 ? 500 : 400,
        fontSize: gold && count > 3 ? 11 : 14,
        letterSpacing: gold && count > 1 ? '2px' : 0,
        cursor: hasYears ? 'help' : 'default',
        textDecoration: hasYears ? 'underline dotted rgba(255,255,255,0.3)' : 'none',
        textUnderlineOffset: 3,
      }}
    >
      {count === 0 ? emptyChar : gold ? '★'.repeat(count) : count}
      {hasYears && (
        <TooltipPortal anchorRect={rect}>
          <div style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: 5, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {years!.length} appearance{years!.length !== 1 ? 's' : ''}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 260 }}>
            {years!.map(y => (
              <span key={y} style={{
                background: 'rgba(245,200,66,0.12)', border: '1px solid rgba(245,200,66,0.25)',
                borderRadius: 4, padding: '1px 7px', fontSize: 12, color: '#fff',
              }}>{y}</span>
            ))}
          </div>
        </TooltipPortal>
      )}
    </div>
  );
}

/* ─── All-Time Standings ─── */
function StandingsTab({ onCountryClick }: { onCountryClick?: (name: string) => void }) {
  type SortKey = 'titles' | 'finals' | 'semis' | 'apps' | 'gp' | 'w' | 'wp' | 'gf';
  const [sortKey, setSortKey] = useState<SortKey>('titles');
  const [asc, setAsc] = useState(false);

  function handleSort(key: SortKey) {
    if (sortKey === key) setAsc(a => !a);
    else { setSortKey(key); setAsc(false); }
  }

  // Win percentage computed field
  function wp(row: AllTimeStanding) {
    return row.gp > 0 ? (row.w / row.gp) * 100 : 0;
  }

  // Default sort: titles desc → finals → semis → apps (best at top)
  const sorted = [...ALL_TIME_STANDINGS].sort((a, b) => {
    let diff = 0;
    if (sortKey === 'wp') {
      diff = wp(b) - wp(a);
    } else {
      diff = (b[sortKey] as number) - (a[sortKey] as number);
    }
    if (diff === 0) {
      // tiebreaker chain
      if (sortKey !== 'titles') diff = b.titles - a.titles;
      if (diff === 0) diff = b.finals - a.finals;
      if (diff === 0) diff = b.semis - a.semis;
      if (diff === 0) diff = b.apps - a.apps;
    }
    return asc ? -diff : diff;
  });

  const cols: { key: SortKey; label: string; tip: string }[] = [
    { key: 'titles', label: 'Titles',  tip: 'World Cup titles won' },
    { key: 'finals', label: 'Finals',  tip: 'Final appearances' },
    { key: 'semis',  label: 'Semis',   tip: 'Semifinal appearances (SF or better)' },
    { key: 'apps',   label: 'Apps',    tip: 'Total World Cup appearances' },
    { key: 'gp',     label: 'GP',      tip: 'Games played (all-time)' },
    { key: 'w',      label: 'W',       tip: 'Total wins' },
    { key: 'wp',     label: 'W%',      tip: 'Win percentage (W ÷ GP × 100)' },
    { key: 'gf',     label: 'GF',      tip: 'Goals scored (all-time)' },
  ];

  const GRID = '36px 1fr 72px 60px 60px 56px 56px 52px 66px 56px';

  return (
    <div>
      <SectionHeader
        title="All-Time Standings"
        subtitle={`Every nation to appear at a World Cup — ${ALL_TIME_STANDINGS.length} nations, data through 2022`}
      />

      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, marginTop: 24,
        overflowX: 'auto', overflowY: 'visible',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: GRID,
          padding: '11px 16px', minWidth: 700,
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'relative', zIndex: 10,
        }}>
          <div style={thStyle}>#</div>
          <div style={{ ...thStyle, textAlign: 'left' }}>Nation</div>
          {cols.map(c => (
            <ColHeader
              key={c.key}
              label={c.label}
              tip={c.tip}
              active={sortKey === c.key}
              asc={asc}
              onClick={() => handleSort(c.key)}
            />
          ))}
        </div>

        {/* Rows */}
        {sorted.map((row, i) => {
          const winPct = row.gp > 0 ? ((row.w / row.gp) * 100).toFixed(1) : '0.0';
          const isChamp = row.titles > 0;
          return (
            <div
              key={row.country}
              style={{
                display: 'grid', gridTemplateColumns: GRID,
                padding: '11px 16px', minWidth: 700,
                borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)',
              }}
            >
              {/* Rank */}
              <div style={{ ...tdStyle, color: 'var(--text-muted)', fontSize: 12 }}>{i + 1}</div>

              {/* Nation */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: onCountryClick ? 'pointer' : 'default' }}
                onClick={() => onCountryClick?.(row.country)}
                title={onCountryClick ? `View ${row.country} profile` : undefined}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{row.flag}</span>
                <div>
                  <span style={{
                    color: isChamp ? '#fff' : '#ddd',
                    fontWeight: isChamp ? 700 : 500, fontSize: 13,
                    borderBottom: onCountryClick ? '1px dotted rgba(245,200,66,0.4)' : undefined,
                    transition: 'color 0.15s',
                  }}
                    onMouseEnter={e => { if (onCountryClick) (e.currentTarget as HTMLSpanElement).style.color = '#f5c842'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = isChamp ? '#fff' : '#ddd'; }}
                  >
                    {row.country}
                  </span>
                  {row.note && (
                    <span style={{ color: 'var(--text-muted)', fontSize: 10, marginLeft: 6 }}>
                      {row.note}
                    </span>
                  )}
                </div>
              </div>

              {/* Titles */}
              <YearCell count={row.titles} years={row.titleYears} gold />

              {/* Finals */}
              <YearCell count={row.finals} years={row.finalYears} />

              {/* Semis */}
              <YearCell count={row.semis} years={row.semiYears} />

              {/* Apps */}
              <div style={tdStyle}>{row.apps}</div>

              {/* GP */}
              <div style={tdStyle}>{row.gp}</div>

              {/* W */}
              <div style={tdStyle}>{row.w}</div>

              {/* W% */}
              <div style={{
                ...tdStyle,
                color: parseFloat(winPct) >= 50 ? '#66bb6a' : parseFloat(winPct) >= 33 ? '#ddd' : 'var(--text-muted)',
                fontWeight: 600, fontSize: 12,
              }}>
                {winPct}%
              </div>

              {/* GF */}
              <div style={tdStyle}>{row.gf}</div>
            </div>
          );
        })}
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 12, lineHeight: 1.6 }}>
        * Data through FIFA World Cup 2022. Germany includes West Germany (same DFB federation).
        Czechia includes Czechoslovakia. Russia includes Soviet Union. Yugoslavia/Serbia combined.
        Click any column header to sort. Hover headers for full names.
      </p>
    </div>
  );
}

/* ─── Shared ─── */
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
        letterSpacing: '0.08em', color: '#fff', margin: '0 0 4px',
      }}>
        {title}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>{subtitle}</p>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  color: 'var(--text-muted)', fontSize: 11, fontWeight: 700,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  textAlign: 'center', display: 'flex', alignItems: 'center',
  justifyContent: 'center', position: 'relative',
};

const tdStyle: React.CSSProperties = {
  color: '#ddd', fontSize: 13, textAlign: 'center',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
