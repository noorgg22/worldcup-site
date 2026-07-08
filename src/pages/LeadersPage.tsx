import { useMemo } from 'react';
import { ALL_MATCHES } from '../data/matches';
import { useIsMobile } from '../hooks/useIsMobile';
import PageFooter from '../components/PageFooter';

// ── Hardcoded player leaders (updated as tournament progresses) ───────────────
const TOP_SCORERS = [
  { name: 'Kylian Mbappé',    country: 'France',      flag: '🇫🇷', goals: 6, assists: 3, note: 'Golden Boot leader' },
  { name: 'Lionel Messi',     country: 'Argentina',   flag: '🇦🇷', goals: 6, assists: 2, note: 'Hat-trick vs Algeria · All-time WC top scorer (19)' },
  { name: 'Erling Haaland',   country: 'Norway',      flag: '🇳🇴', goals: 5, assists: 1, note: '' },
  { name: 'Ousmane Dembélé',  country: 'France',      flag: '🇫🇷', goals: 4, assists: 1, note: 'Hat-trick vs Norway in 32 min' },
  { name: 'Vinícius Júnior',  country: 'Brazil',      flag: '🇧🇷', goals: 4, assists: 2, note: '' },
  { name: 'Harry Kane',       country: 'England',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 3, assists: 1, note: 'England all-time WC top scorer' },
  { name: 'Jonathan David',   country: 'Canada',      flag: '🇨🇦', goals: 3, assists: 0, note: 'Hat-trick vs Qatar' },
  { name: 'Deniz Undav',      country: 'Germany',     flag: '🇩🇪', goals: 3, assists: 1, note: '' },
  { name: 'Kai Havertz',      country: 'Germany',     flag: '🇩🇪', goals: 3, assists: 0, note: '' },
  { name: 'Matheus Cunha',    country: 'Brazil',      flag: '🇧🇷', goals: 3, assists: 1, note: '' },
];

const TOP_KEEPERS = [
  { name: 'Mike Maignan',       country: 'France',    flag: '🇫🇷', cleanSheets: 3, rating: 7.8 },
  { name: 'Emiliano Martínez',  country: 'Argentina', flag: '🇦🇷', cleanSheets: 3, rating: 7.7 },
  { name: 'Unai Simón',         country: 'Spain',     flag: '🇪🇸', cleanSheets: 3, rating: 7.6 },
  { name: 'Alisson Becker',     country: 'Brazil',    flag: '🇧🇷', cleanSheets: 2, rating: 7.5 },
  { name: 'Jordan Pickford',    country: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', cleanSheets: 2, rating: 7.3 },
];

const RECORDS = [
  { icon: '🎯', title: 'Messi breaks all-time WC record', desc: '19 career World Cup goals — surpassing Miroslav Klose\'s record of 17. Oldest player to score a WC hat-trick (38y 357d).', flag: '🇦🇷' },
  { icon: '⚡', title: 'Dembélé hat-trick in 32 minutes', desc: 'Second-fastest hat-trick in World Cup history vs Norway (Jun 26). France won 4–1.', flag: '🇫🇷' },
  { icon: '🇨🇦', title: 'Canada 6–0 Qatar', desc: 'First CONCACAF nation to score 6+ goals in a single World Cup match. Jonathan David scored a hat-trick.', flag: '🇨🇦' },
  { icon: '😱', title: 'Ecuador stun Germany', desc: 'Ecuador 2–1 Germany on matchday 3 — one of the biggest upsets of the group stage.', flag: '🇪🇨' },
  { icon: '🇲🇦', title: 'Morocco eliminate Netherlands on pens', desc: 'Morocco beat Netherlands 3–1 on penalties (1–1 aet) in R32, continuing their giant-killing run.', flag: '🇲🇦' },
  { icon: '🇵🇾', title: 'Paraguay beat Germany on pens', desc: 'Germany 1–1 Paraguay (aet), Paraguay win 4–2 on penalties — a massive R32 upset.', flag: '🇵🇾' },
];

// ── Compute team stats from match data ────────────────────────────────────────
interface TeamStat {
  name: string; flag: string;
  played: number; goals: number; conceded: number;
  wins: number; draws: number; losses: number;
  cleanSheets: number; points: number;
}

function useTeamStats() {
  return useMemo(() => {
    const map = new Map<string, TeamStat>();

    const ensure = (name: string, flag: string) => {
      if (!map.has(name)) map.set(name, { name, flag, played: 0, goals: 0, conceded: 0, wins: 0, draws: 0, losses: 0, cleanSheets: 0, points: 0 });
      return map.get(name)!;
    };

    ALL_MATCHES.filter(m => m.status === 'completed').forEach(m => {
      const hg = m.home.score ?? 0, ag = m.away.score ?? 0;
      const h = ensure(m.home.name, m.home.flag);
      const a = ensure(m.away.name, m.away.flag);

      h.played++; a.played++;
      h.goals += hg; a.goals += ag;
      h.conceded += ag; a.conceded += hg;
      if (hg === 0) a.cleanSheets++;
      if (ag === 0) h.cleanSheets++;

      // For penalty matches, count as a win for the pen winner in knockout
      const penHome = m.penScore?.[0] ?? 0;
      const penAway = m.penScore?.[1] ?? 0;
      const hWins = m.penScore ? penHome > penAway : hg > ag;
      const aWins = m.penScore ? penAway > penHome : ag > hg;

      if (hWins) { h.wins++; a.losses++; h.points += 3; }
      else if (aWins) { a.wins++; h.losses++; a.points += 3; }
      else { h.draws++; a.draws++; h.points++; a.points++; }
    });

    return Array.from(map.values());
  }, []);
}

// ── Sub-components ────────────────────────────────────────────────────────────
const GOLD = '#f5c842';
const MUTED = 'var(--text-muted)';

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--white)', margin: 0, letterSpacing: '0.04em' }}>
        {title}
      </h2>
    </div>
  );
}

function LeaderCard({ rank, name, country, flag, primary, primaryLabel, secondary, secondaryLabel, note, highlight }:
  { rank: number; name: string; country: string; flag: string; primary: number | string; primaryLabel: string; secondary?: number | string; secondaryLabel?: string; note?: string; highlight?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: highlight ? 'rgba(245,200,66,0.06)' : 'var(--bg-card)',
      border: `1px solid ${highlight ? 'rgba(245,200,66,0.25)' : 'var(--border)'}`,
      borderRadius: 12, padding: '12px 16px',
      transition: 'border-color 0.2s',
    }}>
      {/* Rank */}
      <div style={{
        width: 28, flexShrink: 0, textAlign: 'center',
        fontFamily: 'var(--font-display)', fontSize: rank <= 3 ? 18 : 14,
        color: rank === 1 ? GOLD : rank === 2 ? '#c0c0c0' : rank === 3 ? '#cd7f32' : MUTED,
        fontWeight: 700,
      }}>
        {rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}
      </div>

      {/* Flag */}
      <span style={{ fontSize: 24, flexShrink: 0 }}>{flag}</span>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--white)', marginBottom: 1 }}>{name}</div>
        <div style={{ fontSize: 11, color: MUTED }}>{country}</div>
        {note && <div style={{ fontSize: 10, color: 'rgba(245,200,66,0.7)', marginTop: 2, fontStyle: 'italic' }}>{note}</div>}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, flexShrink: 0, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: highlight ? GOLD : 'var(--white)', lineHeight: 1 }}>{primary}</div>
          <div style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{primaryLabel}</div>
        </div>
        {secondary !== undefined && secondaryLabel && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text)', lineHeight: 1 }}>{secondary}</div>
            <div style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{secondaryLabel}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamLeaderRow({ rank, stat, primary, primaryLabel, secondary, secondaryLabel }:
  { rank: number; stat: TeamStat; primary: keyof TeamStat; primaryLabel: string; secondary?: keyof TeamStat; secondaryLabel?: string }) {
  const val = stat[primary] as number;
  const secVal = secondary ? stat[secondary] as number : undefined;
  const isTop = rank === 1;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px',
      background: isTop ? 'rgba(245,200,66,0.05)' : 'transparent',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderLeft: `3px solid ${isTop ? GOLD : 'transparent'}`,
    }}>
      <span style={{ width: 20, textAlign: 'center', fontSize: 11, color: isTop ? GOLD : MUTED, fontWeight: 700, flexShrink: 0 }}>{rank}</span>
      <span style={{ fontSize: 20, flexShrink: 0 }}>{stat.flag}</span>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stat.name}</span>
      {secVal !== undefined && secondaryLabel && (
        <span style={{ fontSize: 12, color: MUTED, minWidth: 40, textAlign: 'right', flexShrink: 0 }}>{secVal} {secondaryLabel}</span>
      )}
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 18, color: isTop ? GOLD : 'var(--white)',
        minWidth: 32, textAlign: 'right', flexShrink: 0,
      }}>{val}</span>
      <span style={{ fontSize: 10, color: MUTED, flexShrink: 0 }}>{primaryLabel}</span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LeadersPage() {
  const isMobile = useIsMobile();
  const teamStats = useTeamStats();

  const topAttack  = [...teamStats].sort((a, b) => b.goals - a.goals || a.played - b.played).slice(0, 8);
  const topDefense = [...teamStats].filter(t => t.played >= 2).sort((a, b) => a.conceded - b.conceded || b.cleanSheets - a.cleanSheets).slice(0, 8);
  const topPoints  = [...teamStats].sort((a, b) => b.points - a.points || b.wins - a.wins).slice(0, 8);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '28px 16px 80px' : '48px 32px 100px' }}>

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 32 : 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
            borderRadius: 100, padding: '5px 14px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef5350', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 10, color: GOLD, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              Live Stats · Updates as matches are played
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 38 : 58, color: 'var(--white)', lineHeight: 1, margin: '0 0 10px' }}>
            TOURNAMENT<br/>LEADERS
          </h1>
          <p style={{ color: MUTED, fontSize: 13 }}>Individual and team statistics for FIFA World Cup 2026</p>
        </div>

        {/* Two-column layout on desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32 }}>

          {/* ── Golden Boot ── */}
          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
            <SectionTitle icon="👟" title="GOLDEN BOOT — TOP SCORERS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TOP_SCORERS.map((p, i) => (
                <LeaderCard
                  key={p.name} rank={i + 1}
                  name={p.name} country={p.country} flag={p.flag}
                  primary={p.goals} primaryLabel="Goals"
                  secondary={p.assists} secondaryLabel="Ast"
                  note={p.note || undefined}
                  highlight={i < 2}
                />
              ))}
            </div>
          </div>

          {/* ── Team Attack ── */}
          <div>
            <SectionTitle icon="⚽" title="TEAM ATTACK" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px 8px 46px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Team</span>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Goals</span>
              </div>
              {topAttack.map((t, i) => (
                <TeamLeaderRow key={t.name} rank={i + 1} stat={t} primary="goals" primaryLabel="GF" secondary="played" secondaryLabel="GP" />
              ))}
            </div>
          </div>

          {/* ── Team Defense ── */}
          <div>
            <SectionTitle icon="🛡️" title="BEST DEFENSE" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px 8px 46px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Team</span>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Conceded</span>
              </div>
              {topDefense.map((t, i) => (
                <TeamLeaderRow key={t.name} rank={i + 1} stat={t} primary="conceded" primaryLabel="GA" secondary="cleanSheets" secondaryLabel="CS" />
              ))}
            </div>
          </div>

          {/* ── Golden Glove ── */}
          <div>
            <SectionTitle icon="🧤" title="GOLDEN GLOVE — TOP KEEPERS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TOP_KEEPERS.map((k, i) => (
                <LeaderCard
                  key={k.name} rank={i + 1}
                  name={k.name} country={k.country} flag={k.flag}
                  primary={k.cleanSheets} primaryLabel="Clean Sheets"
                  secondary={k.rating.toFixed(1)} secondaryLabel="Rating"
                  highlight={i === 0}
                />
              ))}
            </div>
          </div>

          {/* ── Team Points ── */}
          <div>
            <SectionTitle icon="🏆" title="MOST WINS" />
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px 8px 46px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Team</span>
                <span style={{ fontSize: 9, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Wins</span>
              </div>
              {topPoints.map((t, i) => (
                <TeamLeaderRow key={t.name} rank={i + 1} stat={t} primary="wins" primaryLabel="W" secondary="points" secondaryLabel="Pts" />
              ))}
            </div>
          </div>

          {/* ── Records & Milestones ── */}
          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
            <SectionTitle icon="📋" title="RECORDS & MILESTONES" />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
              {RECORDS.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '16px 18px',
                  display: 'flex', gap: 14,
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,200,66,0.2)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{r.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 16 }}>{r.flag}</span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--white)' }}>{r.title}</span>
                    </div>
                    <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <PageFooter />
    </div>
  );
}
